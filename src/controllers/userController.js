import db from "../models"

const User = db.users;

export const signup = async (req, res) => {
    //saving the user
    res.send(`Signup successfully email:${req.body.email} password: ${req.body.password}`);
}