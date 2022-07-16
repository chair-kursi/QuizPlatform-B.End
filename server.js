const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;

//DOTENV SETUP
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

//MIDDLEWARES
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors({ credentials: true, allowedHeaders:['Origin', 'X-Requested0-With', 'Content-Type', 'Accept'],
  methods:['GET', 'PUT', 'PATCH', 'POST'],
  origin:['http://localhost:3000']
}));

app.get('/', (req, res) => {
    res.send("Home Page!!");
})
app.get("/test", (req, res) => {
    res.send("Working Fine!!");
});

//IMPORTING ROUTES 
const quizRouter = require('./routes/quizzes');
const userRouter = require('./routes/users');
const quizTakerRouter = require("./routes/quizTakers")

//USING ROUTES AS MIDDLEWARES 
app.use("/", quizRouter);
app.use("/", userRouter);
app.use("/", quizTakerRouter);

//DATABASE CONNECTION
mongoose
    .connect(process.env.DB_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => { console.log("DataBase Connected"); })
    .catch((error) => { console.log("Error Occured: " + error); })

app.listen(port, function (err) {
    if (err)
        console.log("Error: " + err + "occurred.");
    else
        console.log("Welcome to a new World");
});