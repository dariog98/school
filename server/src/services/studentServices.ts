import { Student } from '../types'

const students: Student[] = [
    {
        id: Number(Date.now() + 1).toString(36),
        names: 'Arnaldo',
        surnames: 'Gonzalez',
        birthdate: '1998-01-01'
    },
    {
        id: Number(Date.now() + 5).toString(36),
        names: 'Esteban',
        surnames: 'Cabrera',
        birthdate: '1998-01-01'
    },
    {
        id: Number(Date.now() + 9).toString(36),
        names: 'Nicolas',
        surnames: 'Cabrera',
        birthdate: '1998-01-01'
    }
]

const getAllStudents = (): Student[] => {
    return students
}

const getStudent = (idStudent: string): Student | undefined => {
    return students.find(student => student.id === idStudent)
}

const createStudent = (names: string, surnames: string, birthdate: string): undefined => {
    const student : Student = { id: Date.now().toString(36),  names, surnames, birthdate }
    students.push(student)
}

const StudentServices = {
    getAllStudents,
    getStudent,
    createStudent
}

export default StudentServices