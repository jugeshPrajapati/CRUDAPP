const {Router}= require('express');
const controller =require ('./controller');
const router = Router();
// router.get('/',(req,res)=>{
//     res.send("using api route");
// });
router.get('/',controller.getStudents);
router.post('/',controller.addStudents);
router.get('/:id',controller.getStudentsById);
router.put("/:id",controller.updateStudent);
router.delete('/:id',controller.removeStudent);
module.exports=router;
