//https://www.positioniseverything.net/javascript-import-vs.-require/
const express= require('express')
const studentsRoutes = require('./src/students/routes');
const app = express();
const port =3000

app.get('/',(req,res)=>{
    res.send("hello world");
})
//req.body is undefined by default, you need to use a parser middleware,
//this solve this TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined.
app.use(express.json())
//app.use is middleware
//The first argument is the URL path to match,in this case, /api/v1/students. 
//The second argument is the middleware function that will handle the incoming HTTP requests.
//studentRoutes is route handlers
app.use('/api/v1/students',studentsRoutes);
//The listen() method is used to start a server and listen for incoming HTTP requests on a specified port. 
app.listen(port,()=> console.log(`app listening on port ${port}`));
