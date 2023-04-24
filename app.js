const express = require("express");

const bodyParser = require("body-parser"); 

const date = require(__dirname + "/date.js"); // This is an exports module and is not installed using 

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.get("/", function(req, res){
    let day = date();
    res.render("list", {listTitle: day, nextItem: items});
    
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", nextItem: workItems})
});

// app.post("/work", function(req, res){
//    var item = req.body.nextItem;
//    workItems.push(item);
//    res.redirect("/work") 
// });

app.post("/", function(req, res){
    var item = req.body.nextItem;
    if(req.body.list==="Work List"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item); 
    res.redirect("/");
    }
    
});

app.listen(3000, function(){
    console.log("Server up and running on port 3000");
});