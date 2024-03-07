import { DataTypes } from 'sequelize'
import { sequelize } from '../config/postgres.js'
import User from './user.js'
import Classroom from './classroom.js'
import Attendance from './attendance.js'
import Role from './role.js'
import Test from './test.js'

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
        tableName: 'professor_subject'
    }
)

const Student_Test = sequelize.define(
    'student_test',
    {
        qualification: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        timestamps: false,
        tableName: 'student_test'
    }
)

User.belongsToMany(Classroom, { through: Student_Classroom, foreignKey: 'student_id', as: 'classrooms' })
Classroom.belongsToMany(User, { through: Student_Classroom, foreignKey: 'subject_id', as: 'students' })

User.belongsToMany(Test, { through: Student_Test, foreignKey: 'student_id', as: 'tests' })
Test.belongsToMany(User, { through: Student_Test, foreignKey: 'test_id', as: 'students' })

User.belongsToMany(Classroom, { through: Professor_Classroom, foreignKey: 'professor_id', as: 'classes' })
Classroom.belongsToMany(User, { through: Professor_Classroom, foreignKey: 'subject_id', as: 'professors' })

User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' })

Classroom.hasMany(Test, { foreignKey: 'subject_id', as: 'tests' })
Test.belongsTo(Classroom, { foreignKey: 'subject_id' })

User.hasMany(Attendance, { foreignKey: 'student_id' })
//Attendance.belongsTo(User, { foreignKey: 'student_id' })
//Classroom.hasMany(Attendance, { foreignKey: 'subject_id' })
//Attendance.belongsTo(Classroom, { foreignKey: 'student_id' })

User.getByUsername = (username) => {
    return User.scope('withPassword').findOne({
        where: { is_deleted: false, username },
        include: ['role']
    })
}

export { User, Classroom, Attendance, Test, Student_Classroom, Professor_Classroom, Student_Test }