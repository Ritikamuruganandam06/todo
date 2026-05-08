const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const{User}=require('../models');
const signup=async(req,res) => {
    try{
        const{username,email,password}=req.body;
        const existingUser=await User.findOne({where:{email}});
        if(existingUser) {
            return res.status(400).json({messages:"user already exists"});
        }
         const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            username,
            email,
            password_hash:hashedPassword
        });
        res.status(201).json({message:'user created',userId:user.id});
    }
    catch(err) {
        res.status(500).json({error:err.message});
    }
};

const login = async(req,res) => {
    try {
        if(!process.env.JWT_SECRET) {
            return res.status(500).json({error:'JWT_SECRET is missing in environment'});
        }
        const{email,password} = req.body;
        const user=await User.findOne({where:{email}});
        if(!user) {
            return res.status(400).json({message:'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password,user.password_hash);
        if(!isMatch) {
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token=jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );
        res.json({message:'Login sucessful',token});
    }
    catch(err) {
        res.status(500).json({error:err.message});
    }
};

module.exports = {signup,login};