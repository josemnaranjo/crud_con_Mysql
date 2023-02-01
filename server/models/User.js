import {DataTypes} from 'sequelize';
import {sequelize} from '../config/mysql.config.js';


export const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isAlpha:{
                msg: "El nombre solo puede contener letras"
            },
            len:{
                args:[2,60],
                msg:"El nombre debe tener un mínimo de dos caracteres"
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:{
                msg:"El formato de correo es incorrecto"
            }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    }

},{
    timestamps:false
})