import { DataTypes } from 'sequelize'
import { sequelize } from '../config/postgres'

const Role = sequelize.define(
    'roles',
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

export default Role