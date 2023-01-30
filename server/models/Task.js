import {DataTypes} from 'sequelize';
import {sequelize} from '../config/mysql.config.js';

export const Task = sequelize.define('task',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING
    },
    done:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

},{
    timestamps:false
})