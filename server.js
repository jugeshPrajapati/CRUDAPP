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
app.use('/api/v1/students',studentsRoutes);
app.listen(port,()=> console.log(`app listening on port ${port}`));
