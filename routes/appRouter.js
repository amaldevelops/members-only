const {Router} =require("express");

const appRouter=Router();

appRouter.get("/", (req, res) => {
    res.render("index");
  });

  module.exports=appRouter;