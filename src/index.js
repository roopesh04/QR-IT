const express=require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const patientRouter=require('./routers/patient')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(patientRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})