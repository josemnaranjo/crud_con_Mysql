import {User} from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const login = async(req,res) => {
    //buscar usuario
    let { email , password } = req.body;

    await User.findAll({
        where:{
            email:email
        }
    }).then(user=> {

        if(!user){
            res.status(404).json({msg:"El usuario no se ha encontrado en la base de datos"})
        } else {

            if(bcrypt.compare(password,user.password)){

                //devolvemos token
                let token = jwt.sign({user:user},"secreto",{
                    expiresIn:"10h"
                });

                return res.json({
                    user:user,
                    token:token
                });

            }else{

                //error en la autorizacion
                res.status(401).json({msg:"Contraseña incorrecta"})
            }
        }

    }).catch(err => {
        res.status(500).json(err);
    })
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