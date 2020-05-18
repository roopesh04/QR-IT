const express=require('express')
const Patient=require('../models/patient')
const auth=require('../middleware/auth')
const router=new express.Router()

router.post('/patient',async(req,res)=>{
    const name=req.body

    //console.log(name)
    // const patient_data=new Patient({
        
    // })

    try{
        
//        await patient_data.save()
        res.status(201).send()
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=router