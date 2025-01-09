const {Router} =require("express");

const appRouter=Router();

appRouter.get("/", (req, res) => {
    res.render("index");
  });

appRouter.get("/new",(req,res)=>{
    res.render("new-message");
});

appRouter.get("/logged",(req,res)=>{
    res.render("logged")
});

module.exports=appRouter;