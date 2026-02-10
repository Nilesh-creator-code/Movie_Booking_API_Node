const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv')
const mongoose = require('mongoose')

const MovieRoutes = require('./routes/movie.routes')
const TheatreRoutes = require('./routes/theatre.routes')


env.config()
const app = express();          //express app object


//Configuring the body parser 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//Invoking movie routes
MovieRoutes(app);
TheatreRoutes(app);  //Invoking theatre routes

app.get('/home', (req, res) => {
    console.log("Hitting /Home");
    console.log(req.body, req.query)
    return res.json({
        success: true,
        message: "Fetch home"
    });
});

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB successfully!");
})
.catch(err => {
    console.log("MongoDB connection error:", err);
});


app.listen(process.env.PORT, async() => {
    //this callback get executed , once we successfully started the server on the given 
    console.log(`Server started on PORT ${process.env.PORT} !!`);        

})
