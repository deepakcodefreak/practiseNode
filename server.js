const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const app = express();
const port = process.env.PORT||3000;

app.set('view engine','hbs')

app.use((req,res,next)=>{
  var now =  new Date().toString();
  var log = `${now} ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n',(error)=>{
    console.log(error);
  })
  next();
})


//
//
// app.use((req,res,next)=>{
//   res.render('maintainence.hbs')
//   // next();
// })



hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear' , ()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})



app.get('/',(req,res)=>{
  res.render('index.hbs',{
    welcomeMessage:'Welcome to Templating Engine Page which is dynamically rendered',
    pageTitle:'Home Page',
    // currentYear:,
  })
})


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Us',
    // currentYear:new Date().getFullYear(),
  })
})



app.listen(port,()=>{
  console.log(`Website is live on port ${port}`);
})
