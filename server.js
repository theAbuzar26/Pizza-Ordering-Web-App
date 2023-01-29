const express=require('express');
// app contains main express objects
const app=express();

//assigning port
const PORT=process.env.PORT || 3000;
// if(process.env.PORT){
//     PORT=process.env.PORT;
// }else{
//     PORT=3000;
// }

app.listen(PORT,()=>{
    console.log("Listening on Port");
})

// after this server is created