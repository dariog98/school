import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql'

const Test = sequelize.define(
    'tests',
    {
        description: {
            type: DataTypes.STRING,
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
    }, 
    {
        timestamps: false
    }
)

export default Test