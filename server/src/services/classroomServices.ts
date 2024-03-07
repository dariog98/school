import { Op, Sequelize } from 'sequelize'
import { ClientError, ServerError } from '../constants/errors'
import { Attendance, Classroom, Professor_Classroom, Student_Classroom, Student_Test, Test, User } from '../models/index'
import { sequelize } from '../config/mysql'
import { USER_ROLES } from '../constants/userRoles'

const getAllClassrooms = async (search : string | undefined = '') => {
    const classrooms = await Classroom.findAll({
        where: { description: { [Op.iLike]: `%${search ?? ''}%` } },
        order: [['description', 'ASC']]
    })
    return classrooms
}

const getClassroomById = async (idClassroom : number) => {
    const classroom = await Classroom.findOne({
        attributes: { 
            include: [
                [sequelize.literal(`(SELECT COUNT(*) from student_subject where subject_id = ${Number(idClassroom)})`), 'totalStudents'],
                [sequelize.literal(`(SELECT COUNT(DISTINCT date) from attendances where subject_id = ${Number(idClassroom)})`), 'totalClasses']
            ],
        },
        where: { id: idClassroom },
        include: ['students', 'professors', 'tests']
    })
    return classroom
}

const getClassroomStudents = async (idClassroom : number, search : string | undefined = '', order) => {
    const [students] = await sequelize.query(`SELECT student_id as id from student_subject where subject_id = ${Number(idClassroom)}`)
    const studentsId = students.map(student => student.id)
    const { count: total, rows: data } = await User.findAndCountAll({
        where: {
            [Op.and]: [
                { id: studentsId },
                Sequelize.where(Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), { [Op.iLike]: `%${search ?? ''}%` }),
            ]
        },
        order: [ order ]
    })
    return { total, data }
}

const getClassroomStudent = async (idClassroom : number, idStudent: number) => {
    const student = await User.findOne({
        where: { id: idStudent },
        include: [
            { model: Classroom, as: 'classrooms', where: { id: idClassroom }},
            { model: Attendance, where: { subject_id: idClassroom }, required: false }
        ]
    })
    if (!student) throw new ClientError('Student not found', 404)
    const studentData = student.get()
    delete studentData.classrooms
    studentData.attendances = studentData.attendances.reduce((accumulator, current) => {
        if (current.status) accumulator.push(current)
        return accumulator
    },[])
    return studentData
}

const getClassroomAttendance = async (idClassroom : number, date: string | undefined, order) => {
    const [students] = await sequelize.query(`SELECT student_id as id from student_subject where subject_id = ${Number(idClassroom)}`)
    const studentsId = students.map(student => student.id)

    if (date) {
        const rows = await Attendance.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('student_id')), 'records'],
            ],
            where: { subject_id: idClassroom, date },
            raw: true
        })
        const status : string = rows[0].records > 0 ? 'saved' : 'unsaved'
        const { count: total, rows: data } = await User.findAndCountAll({
            where: { id: studentsId },
            order: [ order ],
            include: { model: Attendance, where: { subject_id: idClassroom, date }, required: false }
        })
        
        const records = data.map(row => {
            const record = row.get()
            record.attendance = record.attendances[0].status ? record.attendances[0] : null
            delete record.attendances
            return record
        })

        return { total, data: records }
    }
    
    const { count: total, rows } = await User.findAndCountAll({
        where: { id: studentsId },
        order: [ order ],
        include: { model: Attendance, where: { subject_id: idClassroom }, required: false }
    })

    /*
    const data = rows.map(student => {
        const { id, names, surnames, attendances } = student
        const totals = new Array(4).fill(0)
        totals[0] = attendances.length
        attendances.map(attendance => totals[attendance.status] += 1)
        return { id, names, surnames, attendances: { total: totals[0], presents: totals[1], absents: totals[2], lates: totals[3] } }
    })
    */
    return { total, data: rows }
}

const saveClassroomAttendance = async (idClassroom : number, date : string, attendances: any) => {
    try {
        const records = attendances.map(attendance => ({ student_id: attendance.idStudent, subject_id: idClassroom, date, status: attendance.status }))
        await Attendance.bulkCreate(records, { updateOnDuplicate: ['status'] })    
    } catch(error) {
        console.log(error)
        throw new ServerError('Server error')
    }
}

const getClassroomTests = async (idClassroom : number, order) => {
    const { count: total, rows: data } = await Test.findAndCountAll({ where: { subject_id: idClassroom }, order: [order]})
    return { total, data }
}

const getClassroomTest = async (idClassroom : number, idTest : number) => {
    const classroom = await Classroom.findOne({ where: { id: idClassroom }})
    if (!classroom) throw new ClientError('Classroom not found', 404)
    const test = await Test.findOne({ where: { id: idTest, subject_id: idClassroom }, include: ['students'] })
    if (!test) throw new ClientError('Test not found', 404)
    const { description, date, students } = test
    return {
        description,
        date,
        students: students.map(student => {
            const { names, surnames, id, student_test: { qualification } } = student

            return {
                id, names, surnames, qualification
            }
        })
    }
}

const createClassroom = async (description : string) => {
    try {
        await Classroom.create({ description })
    } catch(error) {
        throw new ServerError('Server error')
    }
}

const updateClassroom = async (idClassroom : number, description : string) => {
    const classroom = await Classroom.findOne({ where: { id: idClassroom }})
    if (!classroom) throw new ClientError('Classroom not found', 404)
    try {
        await classroom.update({ description })
    } catch(error) {
        throw new ServerError('Server error')
    }
}

const createClassroomTest = async (idClassroom : number, description : string, date : string, students : number[]) => {
    const transaction = await sequelize.transaction()
    try {
        const test = await Test.create({ subject_id: idClassroom, description, date }, { transaction })
        const records = students.map(idStudent => ({ student_id: idStudent, test_id: test.id }))
        await Student_Test.bulkCreate(records, { updateOnDuplicate: ['qualification'], transaction })
        await transaction.commit()
    } catch(error) {
        await transaction.rollback()
        throw new ServerError('Server error')
    }
}

const updateClassroomTest = async (idClassroom : number, idTest : number, description : string, date : string, students : number[]) => {
    const classroom = await Classroom.findOne({ where: { id: idClassroom }})
    if (!classroom) throw new ClientError('Classroom not found', 404)

    const test = await Test.findOne({ where: { id: idTest, subject_id: idClassroom }})
    if (!test) throw new ClientError('Test not found', 404)

    const transaction = await sequelize.transaction()
    try {
        await test.update({ description, date }, { transaction })
        const records = students.map(student => ({ student_id: student.id, test_id: test.id, qualification: student.qualification }))
        await Student_Test.bulkCreate(records, { updateOnDuplicate: ['qualification'], transaction })
        await transaction.commit()
    } catch(error) {
        console.log(error)
        await transaction.rollback()
        throw new ServerError('Server error')
    }
}


const addStudentToClassroom = async (idClassroom : number, idStudent : number) => {
    try {
        await Student_Classroom.create({ subject_id: idClassroom, student_id: idStudent })
    } catch(error) {
        throw new ServerError('Server error')
    }
}

const removeStudentToClassroom = async (idClassroom : number, idStudent : number) => {
    const classroom = await Classroom.findOne({ where: { id: idClassroom }})
    if (!classroom) throw new ClientError('Classroom not found', 404)
    try {
        await Student_Classroom.destroy({ where: { subject_id: idClassroom, student_id: idStudent } })
    } catch(error) {
        console.log(error)
        throw new ServerError('Server error')
    }
}

const addProfessorToClassroom = async (idClassroom : number, idProfessor : number) => {
    const classroom = await Classroom.findOne({ where: { id: idClassroom }})
    if (!classroom) throw new ClientError('Classroom not found', 404)
    const user = await User.findOne({ where: { id: idProfessor } })
    if (!user) throw new ClientError('User not found', 404)
    if (user.role_id !== USER_ROLES.Professor) throw new ClientError('User is not a valid professor', 401)

    try {
        await Professor_Classroom.create({ subject_id: idClassroom, professor_id: idProfessor })
    } catch(error) {
        throw new ServerError('Server error')
    }
}

const removeProfessorToClassroom = async (idClassroom : number, idProfessor : number) => {
    const classroom = await Classroom.findOne({ where: { id: idClassroom }})
    if (!classroom) throw new ClientError('Classroom not found', 404)
    try {
        await Professor_Classroom.destroy({ where: { subject_id: idClassroom, professor_id: idProfessor } })
    } catch(error) {
        console.log(error)
        throw new ServerError('Server error')
    }
}

const ClassroomServices = {
    getAllClassrooms,
    getClassroomById,
    getClassroomStudent,
    getClassroomStudents,
    createClassroom,
    updateClassroom,
    saveClassroomAttendance,
    getClassroomAttendance,
    getClassroomTests,
    getClassroomTest,
    createClassroomTest,
    updateClassroomTest,
    addStudentToClassroom,
    removeStudentToClassroom,
    addProfessorToClassroom,
    removeProfessorToClassroom,
}

export default ClassroomServices