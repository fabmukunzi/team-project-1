import express from "express";

const App=express()
const port=process.env.PORT||3000
App.listen(port,()=>{
    console.log(`Server is running on the port ${port} !`)
})