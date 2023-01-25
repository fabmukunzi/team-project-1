const  googleLogin = ((req, res) =>{
    res.status(200).send('<a href="auth/google"><h1>Continue with google</h1></a>');
});

export default googleLogin;