import express from "express";
import dotenv from "dotenv"
import sequelize  from "sequelize";
import db from "./src/models"
import router from "./src/routes/userRoutes.js"
import pg from "pg"
import googleAuth from './src/middlewares/googleAuth/auth.js'
import passport from "passport";
import session from "express-session";

// Load google auth
googleAuth.call();

const app=express()

app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
const port=process.env.PORT||3000

// db.sequelize.sync({ force: false }).then(() => {
//   console.log("db has been re sync")

// })

app.use('/api/v1/users', router)
app.listen(port,()=>{
    console.log(`Server is running on the port ${port} !`)
})