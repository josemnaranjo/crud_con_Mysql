import {Project} from '../models/Projects.js'
import { Task } from '../models/Task.js';

export const getProjects = async (req,res) => {
    try{
        const projects = await Project.findAll();
        res.json(projects)
    }catch(err){
        return res.status(500).json({message:error.message})
    }
}

export const createProjects = async (req,res) => {
    try{
        const { name , priority , description } = req.body;
        const newProject = await Project.create({
            name,priority,description
        });
        res.json(newProject);
    }catch(err){
        return res.status(500).json({message:error.message})
    }
}

export const updateProject = async (req,res) => {
    const idProject = req.params.id;
    const {name, priority, description} = req.body;
    try {
        const projectUpdated = await Project.update({name,priority,description},{where:{
            id:idProject
        }});
        res.json(projectUpdated);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const deleteProject = async (req,res) => {
    try {
        const idProject = req.params.id;
        await Project.destroy({where:{id:idProject}})
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const getOneProject = async (req,res) => {
    const idProject = req.params.id
    try{
        const project = await Project.findAll({where:{id:idProject}});

        if(project.length ===0){
            return res.status(404).json({message:"El proyecto no existe"})
        };

        res.json(project)
    }catch(err){
        return res.status(500).json({message:error.message})
    }
};


export const getProjectTasks = async(req,res)=>{
    try {
        const idProject = req.params.id;
        const tasks = await Task.findAll({where:{projectId:idProject}});
        res.json(tasks)
    } catch (error) {
        
    }
}