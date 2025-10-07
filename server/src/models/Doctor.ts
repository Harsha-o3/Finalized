import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection.js';
import User from './User.js';

export class Doctor extends Model {
  public id!: string;
  public userId!: string;
  public regNo?: string;
  public specializations!: string[];
  public qualifications?: string;
  public languages!: string[];
  public available!: any;
  public telemedicineEnabled!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Doctor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: 'user_id'
    },
    regNo: {
      type: DataTypes.STRING(100),
      field: 'reg_no'
    },
    specializations: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('specializations');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('specializations', JSON.stringify(value || []));
      }
    },
    qualifications: {
      type: DataTypes.TEXT
    },
    languages: {
      type: DataTypes.TEXT,
      defaultValue: '["en"]',
      get() {
        const rawValue = this.getDataValue('languages');
        return rawValue ? JSON.parse(rawValue) : ['en'];
      },
      set(value) {
        this.setDataValue('languages', JSON.stringify(value || ['en']));
      }
    },
    available: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
      get() {
        const rawValue = this.getDataValue('available');
        return rawValue ? JSON.parse(rawValue) : {};
      },
      set(value) {
        this.setDataValue('available', JSON.stringify(value || {}));
      }
    },
    telemedicineEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'telemedicine_enabled'
    }
  },
  {
    sequelize,
    modelName: 'Doctor',
    tableName: 'doctors',
    underscored: true
  }
);

// Associations
Doctor.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Doctor, { foreignKey: 'userId', as: 'doctor' });

export default Doctor;
