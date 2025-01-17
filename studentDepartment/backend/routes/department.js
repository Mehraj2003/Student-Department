const express=require('express')
const { addDepartment, editDepartment, deleteDepartment, getAllDepartments, getDepartmentById } = require('../controllers/department/department_controller')
const router=express.Router()


router.post('/addDepartment',addDepartment)
router.put('/editDepartment/:departmentId',editDepartment)
router.delete('/deleteDepartment/:departmentId',deleteDepartment)
router.get('/getAllDepartments',getAllDepartments)
router.get('/getSingleDepartmentById/:departmentId',getDepartmentById)

module.exports=router