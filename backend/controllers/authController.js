const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const signupUser = async (req, res)=>{
    try{
        const {username, emailId, password} = req.body;
        if(!password && password.length< 6){
            res.status(201).json({message:"password must be 6 digit long or more"})
        }
        const existedUser = await User.findOne({emailId});
        if(existedUser){
            res.status(201).json({message:"user already exist please login"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User ({
            username,
            emailId,
            password:hashPassword
        })
        await newUser.save()
        
        res.status(200).json({message:"Signup successfully",
            user:{
                username,
                emailId,
                password
            }
        });
        
    }
    catch(error){
        res.status(201).json({message:"error in signup", error:error.message})
        
    }
    
}


// loginUser
const loginUser = async(req,res)=>{
    try{
        const {emailId, password}= req.body;
        const user = await User.findOne({emailId})
        if(!user){
            res.status(201).json({message:"User not found please signUp"})   
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(201).json({message:"Please enter a valid password"})   
        }

        res.status(200).json({message:"login successfully",
            user:{
                userId: user._id,
                emailId:user.emailId,
                password:user.password
            }
        })
    }
    catch(error){
        res.status(201).json({message:"error in login", error:error.message})

    }

}

module.exports = {signupUser, loginUser}