var express = require("express")
var bodyParser = require("body-parser")
var morgan = require("morgan")
var mongoose = require('mongoose');

// var config = require()
var setupController = require("./api/controllers/setupController")
var todoController = require("./api/controllers/todoController")

var app = express()
var port = process.env.PORT || 3000

app.use("/assets", express.static(__dirname + "/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan("dev"))

app.set("view engine", "ejs")

mongoose.connect('mongodb://localhost:27017/node-todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

setupController(app)
todoController(app)


app.get("/", function (req, res) {
    res.render("index")
})

app.listen(port, function() {
    console.log("App listening port: " + port)
})

