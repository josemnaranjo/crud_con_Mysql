import express from 'express'
import { sequelize } from './config/mysql.config.js';
import projectsRoutes from './routes/projects.routes.js'
import tasksRoutes from './routes/tasks.routes.js';


const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(projectsRoutes);
app.use(tasksRoutes);


async function main (){
    try {
        await sequelize.sync();
        console.log("Conexion exitosa con la base de datos")
        app.listen(3000, ()=>{
            console.log("Escuchando al puerto 3000");
        })
    } catch (error) {
        console.log("Error al conectarse a la base de datos")  
    }
}

main();