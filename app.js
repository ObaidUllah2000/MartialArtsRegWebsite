const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactMArtsWeb');
}
const { render } = require('pug');

const app = express();
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const Contact = mongoose.model('Contact', contactSchema);


// Express Setting files
app.use('/static', express.static(path.join(__dirname,'static')));
app.use(express.urlencoded());

// Linking Pug files
app.set('view engine', 'pug');
app.set('/views', path.join(__dirname,'views'));

//Directing the web

app.get('/', (req,res)=>{
    const params= {};
            res.status(200).render('home.pug',params);
});
app.get('/contact', (req,res)=>{
    const params= {};
            res.status(200).render('contact.pug',params);
});
app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        // let params={'message': 'The Details have been saved to the BataBase'};
        // res.status(200).render('contact.pug',params);
        res.status(200).send("Your Concern has been Recorded")
    }).catch(()=>{
        // let params={'message':'The Details failed to save'};
        // res.status(200).render('contact.pug',params);
        res.status(404).send("Failed to upload your Concern")
    })
});



// Starting the server
app.listen(port, (req,res)=>{
    console.log(`The Server has started successfully at ${port} `);
})


