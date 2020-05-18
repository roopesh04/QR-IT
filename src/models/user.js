const moongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
//const Patient=require('./patient')
const jwt=require('jsonwebtoken')

const userScheme=new moongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password cannot contain 'Password ")
            }
        }
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<1){
                throw new Error("Age must be a positive number")
            }
        }
    },
    tokens:[{
        token:{
            type:String
        }
    }]
},{
    timestamps:true
})

userScheme.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})

    if(!user){
        throw new Error("Unable to login")
    }

    const isMatch=(password===user.password)?1:0

    if(!isMatch){
        throw new Error("Unable to login")
    }

    return user
}

userScheme.pre('save',async function(next){
    const user=this

    next()
})

userScheme.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},"thisismynodejsapplication")

    user.tokens=user.tokens.concat({token})
    await user.save()

    return token
}

const User=moongoose.model('User',userScheme)

module.exports=User