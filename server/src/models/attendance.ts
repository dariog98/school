import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql'

const Attendance = sequelize.define(
    'attendances',
    {
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subject_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        timestamps: false
    }
)

Attendance.removeAttribute('id')

export default Attendance