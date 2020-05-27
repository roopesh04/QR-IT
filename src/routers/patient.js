const express=require('express')
const Patient=require('../models/patient')
const auth=require('../middleware/auth')
const router=new express.Router()

router.post('/patient',auth,async(req,res)=>{
    const patient=new Patient({
        ...req.body,
        doctor:req.user._id
    })
    

    try{
        await patient.save()
        res.status(201).send(patient)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/patient/:id',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','data']
    const isvalidOperation=updates.every((update)=>allowedUpdates.includes(update))

    if(!isvalidOperation){
        return res.status(400).send({error:"Invalid Update Request!"})
    }
    try{
        console.log(req.params.id,req.user._id)
        const patient=await Patient.findOne({_id:req.params.id,doctor:req.user._id})
        console.log(patient)

        if(!patient){
            return res.status(404).send()
        }

        updates.forEach((update)=>patient[update]=req.body[update])
        await patient.save()
        res.send(patient)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/patient/:id',auth,async(req,res)=>{
    console.log(req.params.id,req.user._id)
    try{
        const patient=await Patient.findOneAndDelete({_id:req.params.id,doctor:req.user._id})

        if(!patient){
            res.status(404).send()
        }

        res.send(patient)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/patient/:name',async(req,res)=>{

    const data=await Patient.find({name:req.params.name})
    try{
        res.status(200).send(data)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router