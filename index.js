const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv')
const mongoose = require('mongoose')

const MovieRoutes = require('./routes/movie.routes')


env.config()
const app = express();          //express app object


//Configuring the body parser 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

MovieRoutes(app);   //Invoking movie routes

app.get('/home', (req, res) => {
    console.log("Hitting /Home");
    return res.json({
        success: true,
        message: "Fetch home"
    });
});


app.listen(process.env.PORT, async() => {
    //this callback get executed , once we successfully started the server on the given 
    console.log(`Server started on PORT ${process.env.PORT} !!`);


    try {
        
    await mongoose.connect(process.env.DB_URL);         //Connect to the mongo server
    console.log("Successfully connected to the mongodb ")
    // await Movie.create({
    // name: "Bachhan Pandey",
    // description: "Comedy Masala Movies",
    // casts: ["Akshay Kumar", "Kirti Senon", "Jaqueline Ferandiz"],
    // director: "Farhad Samji",
    // trailerUrl: "http://bachhanpandey/trailor/1",
    // language: "Hindi",
    // releaseDate: "18-03-2022",
    // releaseStatus: "RELEASE"
    // })


    } catch(err) {
        console.log("Not able to connect mongodb", err);
    }

})
