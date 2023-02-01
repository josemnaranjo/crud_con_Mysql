import {User} from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const login = async(req,res) => {
    try {
        const {email , password} = req.body;

        const user = await User.findAll({where:{email: email}});
    
        if(user===null){
            return res.json({msg:"El usuario no existe en la base de datos"})
        };

        const correctPasword = await bcrypt.compare(password,user[0].password);

        if(!correctPasword){
            return res.json({msg:"La contraseña es incorrecta"})
        }

        const token = jwt.sign({user:user},"secreto",{expiresIn:"10h"})

        return res.json({
            user:user,
            token:token
        });

    } catch (error) {
        res.status(500).json({error:"Algo salio mal "+error});
    }
};


export const signup = async(req,res) => {

    //se encripta la contraseña
    let password = bcrypt.hashSync(req.body.password,10);

    //creamos usuario
    await User.create({
        name: req.body.name,
        email:req.body.email,
        password:password
    })
    .then(user=>{
        //creamos el token
        let token = jwt.sign({user:user},"secreto",{
            expiresIn:"10h"
        });

        res.json({
            user: user,
            token:token
        });

    }).catch(err=> {
        res.status(500).json(err);
    })
    

}