var userdb = require('../model/model');

// create and save new user
exports.create=(req,res)=>{
// validate request
if(!req.body){
    res.status(400).send({message:"cannot send empty body!"});
    return;
}

const user = new userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})
user 
    .save(user)
    .then(data=>{
        //res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"cannot send empty body!"});
    });

}

// retrive and return all users
exports.find=(req,res)=>{

    if(req.query.id){
        const id= req.query.id;

        userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot find user with ${id},may be id not found!`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"ERROR occured while retrive specific userID"});
        })


    }
    else{
        userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"ERROR occured while retrive"});
    })

    }
    
    
}

// update single user using id
exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"update req cannot send empty body!"});
        return;
    }
    const id= req.params.id;
    userdb.findByIdAndUpdate(id,req.body, {useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot update user with ${id},may be id not found!`});
        }
        else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"ERROR occured while Update"});
    })
    
}

// delete single user using id
exports.delete=(req,res)=>{

    const id= req.params.id;

    userdb.findByIdAndDelete(id) 
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot delete user with ${id},may be id not found!`});
        }
        else{
            res.send({message:"User data deleted successfully!"});
        }
    })  
    .catch(err=>{
        res.status(500).send({message:err.message||"ERROR occured while Delete!"});
    })
}