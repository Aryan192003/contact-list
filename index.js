const express = require('express');
const path = require('path');
const { nextTick } = require('process');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views') );
app.use(express.urlencoded( {extended: true}));   //pareser it is used to take data from from and put it as object
app.use(express.static('assets'))


// //middleware1
// app.use(function(req,res,next){
//     console.log('middleware1 is called')
//     next();
// })

// //middleware2
// app.use(function(req,res,next){
//     console.log('middleware2 is called')
//     next();
// })

var contactlist = [
    {
        name: "Äryan",
        phone: "8319425869"
    },
    {
        name: "Äryan",
        phone: "8319425869"
    },
    {
        name: "Äryan",
        phone: "8319425869"
    }
]
app.get('/', function(req,res){
     Contact.find({}).then((contacts) => {
        return res.render('home',{
            title: "My contacts",
            contact_list: contacts
        });
    })
    .catch((err)=> {console.error(err)})
        
    
   
});

app.post('/create-contact', function(req,res){
    // contactlist.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then(()=> console.log("inserted"))
    .catch((err)=> {console.error(err)})
    return res.redirect('/');
})

app.get('/delete-contact',function(req,res){
    let id = req.query.id;

    Contact.findByIdAndDelete(id).then(()=> console.log("deleted"))
    .catch((err)=> {console.error(err)})
    return res.redirect('/');
})

app.listen(port,function(err){
    if(err){
        console.log('error ',err);

    }
    console.log('server is live on ',port);
})