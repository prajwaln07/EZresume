const express = require('express');
const app=express();
const PORT=8000;

app.listen(PORT,()=>{
    console.log(`app is listening at PORT ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("app is running");
})