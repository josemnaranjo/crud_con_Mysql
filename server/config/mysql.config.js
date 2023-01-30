import Sequelize from 'Sequelize';

export const sequelize = new Sequelize(
    'prueba_crud',
    'root',
    'josemnaranjoc',
    {
        host:'localhost',
        dialect:'mysql'
    }
);
