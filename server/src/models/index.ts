import User from './user'
import Classroom from './classroom'
import { sequelize } from '../config/mysql';
import Attendance from './attendance';
import Role from './role';

const Student_Classroom = sequelize.define(
    'student_subject',
    {},
    {
        timestamps: false,
        tableName: 'student_subject'
    }
)

const Professor_Classroom = sequelize.define(
    'professor_subject',
    {},
    {
        timestamps: false,
        tableName: 'profesor_subject'
    }
)

User.belongsToMany(Classroom, { through: Student_Classroom, foreignKey: 'student_id', as: 'classrooms' })
Classroom.belongsToMany(User, { through: Student_Classroom, foreignKey: 'subject_id', as: 'students' })

User.belongsToMany(Classroom, { through: Professor_Classroom, foreignKey: 'profesor_id', as: 'classes' })
Classroom.belongsToMany(User, { through: Professor_Classroom, foreignKey: 'subject_id', as: 'professors' })

User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' })
User.hasOne(Attendance, { foreignKey: 'student_id' })
//Attendance.belongsTo(User, { foreignKey: 'student_id' })

User.getByUsername = (username: string) => {
    return User.scope('withPassword').findOne({
        where: { is_deleted: 0, username },
        include: ['role']
    })
}

export { User, Classroom, Attendance }