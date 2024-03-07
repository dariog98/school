import { DataTypes } from 'sequelize'
import { sequelize } from '../config/postgres'

const Classroom = sequelize.define(
    'subjects',
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        classtime_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, 
    {
        timestamps: false
    }
)

export default Classroom