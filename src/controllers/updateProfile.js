const updateProfile = ((req, res) => {
    res.send(`Welcome ${req.user.displayName}`)
})

export default updateProfile;