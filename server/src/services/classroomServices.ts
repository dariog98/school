import { ServerError } from '../constants/errors'
import { Attendance, Classroom, User } from '../models/index'
import { sequelize } from '../config/mysql'

const getAllClassrooms = async () => {
    const classrooms = await Classroom.findAll({ order: [['description', 'ASC']]})
    return classrooms
}

const getClassroomById = async (idClassroom : number) => {
    const classroom = await Classroom.findOne({
        attributes: { 
            include: [[sequelize.literal(`(SELECT COUNT(*) from student_subject where subject_id = ${Number(idClassroom)})`), 'totalStudents']]
        },
        where: { id: idClassroom },
        include: ['students', 'professors']
    })
    return classroom
}

const getClassroomStudents = async (idClassroom : number, order) => {
    const [students] = await sequelize.query(`SELECT student_id as id from student_subject where subject_id = ${Number(idClassroom)}`)
    const studentsId = students.map(student => student.id)
    const { count: total, rows: data } = await User.findAndCountAll({ where: { id: studentsId }, order: [ order ] })
    return { total, data }
}

const getClassroomAttendance = async (idClassroom : number, date, order) => {
    const [students] = await sequelize.query(`SELECT student_id as id from student_subject where subject_id = ${Number(idClassroom)}`)
    const studentsId = students.map(student => student.id)
    const { count: total, rows: data } = await User.findAndCountAll({
        where: { id: studentsId },
        order: [ order ],
        include: { model: Attendance, where: { subject_id: idClassroom, date }, required: false }
    })
    return { total, data }
}

const saveClassroomAttendance = async (idClassroom : number, date : string, attendances: any) => {
    try {
        const records = attendances.map(attendance => ({ student_id: attendance.idStudent, subject_id: idClassroom, date, status: attendance.status }))
        console.log(records)
        await Attendance.bulkCreate(records, { updateOnDuplicate: ['status'] })    
    } catch(error) {
        console.log(error)
        throw new ServerError('Server error')
    }
}

const createClassroom = async (description : string) => {
    try {
        await Classroom.create({ description })
    } catch(error) {
        throw new ServerError('Server error')
    }
}

const ClassroomServices = {
    getAllClassrooms,
    getClassroomById,
    getClassroomStudents,
    createClassroom,
    saveClassroomAttendance,
    getClassroomAttendance,
}

export default ClassroomServices