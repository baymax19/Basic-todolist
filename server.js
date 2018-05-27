var experss=require("express")
var app=experss()
var session=require("cookie-session")
var bodyp=require("body-parser")
var url=bodyp.urlencoded({extended :false})

app.set("view engine","ejs")

app.use(session({secret :'todo'}))

app.use(function(req,res,next){
    if(typeof(req.session.todolist)== "undefined")
    {
        req.session.todolist=[]
    }
    next();
})
app.get("/todo",function(req,res)
{
    res.render("index",{todolist:req.session.todolist})
})

app.get("/todo/delete/:id",function(req,res)
{
    if(req.param.id!==" ")
    {
        req.session.todolist.splice(req.params.id,1)
    }
    res.redirect("/todo");
})
app.post("/todo/add",url,function(req,res)
{
    console.log(req.body.newtodo)
    if(req.body.newtodo!="")
    {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect("/todo");
})
app.use(function(req,res){
    res.redirect("/todo")
})

app.listen(3000)