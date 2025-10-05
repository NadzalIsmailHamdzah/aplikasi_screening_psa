// models/Applicant.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Applicant = sequelize.define('Applicant', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    communicationSkill: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 4 }
    },
    publicSpeakingSkill: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 4 }
    },
    teamworkSkill: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 4 }
    },
    leadershipSkill: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 4 }
    }
}, {
    tableName: 'applicants',
    timestamps: true
});

export default Applicant;