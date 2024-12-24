const isAdmin= async (req,res,next)=>{
    const decodeToken = jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY);
    if (decodeToken) {
        const user = await User.findById(decodeToken._id)
        if(user.isAdmin){
            next()
        }
        else{
            res.status(403).send({message:"no admin privileges"})
        }
    }
}

module.exports={
    isAdmin
}