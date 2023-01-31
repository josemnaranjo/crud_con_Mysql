import {Task} from '../models/Task.js';

export const createTask = async(req,res)=>{
    try {
        const {name ,done , projectId} = req.body;
        const newTask = await Task.create({name , done , projectId});
        res.json(newTask);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const getTasks = async(req,res)=>{
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const getOneTask = async(req,res)=>{
    try {
        const idTask = req.params.id
        const tasks = await Task.findAll({where:{id:idTask}});
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const updateTask = async(req,res)=>{
    try {
        const idTask = req.params.id;
        const {name,done ,projectId} = req.body;
        const updatedTask = await Task.update({name, done ,projectId},{where:{id:idTask}});
        res.json(updatedTask);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const deleteTask = async(req,res)=>{
    try {
        const idTask = req.params.id;
        await Task.destroy({where:{id:idTask}});
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

