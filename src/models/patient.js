const mongoose=require('mongoose')

const PatientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    data:[{
        medicine:{
            type:String,
            trim:true
        },
        timing:{
            type:String,
            trim:true
        }
    }],
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const Patient=mongoose.model('Patient',PatientSchema)

module.exports=Patient