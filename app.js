const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');


dotenv.config({path:'config.env'})
const PORT =process.env.PORT || 8080;

const app = express();

//log request
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs");

//load asset 
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))




app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/add-user',(req,res)=>{
    res.render('add_user');
});

app.get('/update-user',(req,res)=>{
    res.render('update_user');
});


app.listen(PORT,()=>{
    console.log(`connected in http://localhost:${PORT}`)

});
