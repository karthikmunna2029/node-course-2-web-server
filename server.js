const express=require('express');
const hbs=require('hbs');
const fs=require('fs');


hbs.registerPartials(__dirname + '/views/partials');

var app=express();

app.set('view engine','hbs');



//Register middleware

app.use((req,res,next)=>
{
     var now=new Date().toString();
     var log=`${now}:${req.method} ${req.url}`;
     console.log(log);
     fs.appendFile('server.log',log + '\n',(err)=>{
         if(err)
         {
             console.log('unable to append to server.log');
         }
     });
     next(); 
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
    
// })

//Add some middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new  Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{

    return text.toUpperCase();

});

app.get('/',(req,res)=>{

 res.render('home.hbs',
 {
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to my website'
 });
 });

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
       
    });
})


app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
});



