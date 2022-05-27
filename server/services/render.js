const axios= require('axios');
const { response } = require('express');

exports.home=(req,res)=>{

    // Make get request to the /api/users/
    axios.get('http://localhost:3000/api/users')
    .then((response)=>{
        console.log(response.data);
        res.render('index',{user:response.data});
    })
    .catch(err=>{
        res.send(err);
    }) 
    
    
}
exports.add_user=(req,res)=>{
    res.render('add_user');
}
exports.update_user=(req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user:userdata.data});
        // console.log("Navin",{user:userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
    // res.render('update_user');
}
