const pool=require('../../db')
const queries = require('./queries')
const getStudents=(req,res)=>{
    console.log("getting students");
    pool.query(queries.getStudents,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};
const getStudentsById=(req,res)=>{
    console.log("getting students by id ");
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};
const addStudents=(req,res)=>{
    console.log("add students ");
    const {name,email,age,dob}=req.body;
    console.log(name,email,age,dob);
    pool.query(queries.checkEmailExists,[email],(error,results)=>{
        if(results.rows.length){
            return res.send("email already exists");
        }
        //add student to db
        pool.query(
            queries.addStudents,
            [name,email,age,dob],
            (error,results)=>{
                if (error) throw error;
                res.status(201).send("student created successfully");
            }
        );
    });
};
const removeStudent=(req,res)=>{
    console.log("remove students ");
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById,[id],(error,results)=>{
        const noStudentFound=!results.rows.length;
        if (noStudentFound){
            res.send("Student does not exist in the database ");
        }   
        pool.query(queries.removeStudent,[id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("student removed successfully");
        })
    });
}

const updateStudent=(req,res)=>{
    console.log("update students ");
    const id = parseInt(req.params.id);
    const {name}=req.body;
    pool.query(queries.getStudentsById,[id],(error,results)=>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound){
            res.send("student does not exist in the database");
        }
        pool.query(queries.updateStudent,[name,id],(error,results)=>{
            if(error ) throw error;
            res.status(200).send("Student updated Successfully");

        });
    });

}
module.exports={
    getStudents,
    getStudentsById,
    addStudents,
    removeStudent,
    updateStudent,
}