import { ClientError, ServerError } from '../constants/errors'
import { Attendance, Classroom, Student_Classroom, Test, User } from '../models/index'
import { sequelize } from '../config/mysql'

const getAllClassrooms = async () => {
    const classrooms = await Classroom.findAll({ order: [['description', 'ASC']]})
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

const getClassroomStudents = async (idClassroom : number, order) => {
    const [students] = await sequelize.query(`SELECT student_id as id from student_subject where subject_id = ${Number(idClassroom)}`)
    const studentsId = students.map(student => student.id)
    const { count: total, rows: data } = await User.findAndCountAll({ where: { id: studentsId }, order: [ order ] })
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
        const status = rows[0].records > 0 ? 'saved' : 'unsaved'
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

    const { count: total, rows: data } = await User.findAndCountAll({
        where: { id: studentsId },
        order: [ order ],
        include: { model: Attendance, where: { subject_id: idClassroom }, required: false }
    })
    return { total, data }
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

const createClassroom = async (description : string) => {
    try {
        await Classroom.create({ description })
    } catch(error) {
        throw new ServerError('Server error')
    }
}

const createClassroomTest = async (idClassroom : number, description : string, date : string, students : number[]) => {
    try {
        await Test.create({ subject_id: idClassroom, description, date })
    } catch(error) {
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

const ClassroomServices = {
    getAllClassrooms,
    getClassroomById,
    getClassroomStudent,
    getClassroomStudents,
    createClassroom,
    saveClassroomAttendance,
    getClassroomAttendance,
    getClassroomTests,
    createClassroomTest,
    addStudentToClassroom,
    removeStudentToClassroom
}

export default ClassroomServices