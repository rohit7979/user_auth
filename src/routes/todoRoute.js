const {Router} = require('express');

const todoRouter = Router();

todoRouter.get('/',(req,res)=>{
    res.json({message:"this is a todo route"});
    
})

module.exports = todoRouter;