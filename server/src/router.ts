import {Router} from "express";
import {createAdmin, deleteAdmin, getAdminById, getAllAdmin, updateAdmin} from "./handlers/admin";
import {createEducator, deleteEducator, getAllEducators, getEducatorById, updateEducator} from "./handlers/educator";
import {deleteStudent, getAllStudents, getStudentById, updateStudent} from "./handlers/student";

const router = Router()

// ADMIN ROUTES
router.get('/admin', getAllAdmin)
router.get('/admin/:id', getAdminById)
router.post('/admin', createAdmin)
router.put('/admin/:id', updateAdmin)
router.delete('/admin/:id', deleteAdmin)

// EDUCATOR ROUTES
router.get('/educator', getAllEducators)
router.get('/educator/:id', getEducatorById)
router.post('/educator', createEducator)
router.put('/educator/:id', updateEducator)
router.delete('/educator/:id', deleteEducator)

// STUDENT ROUTES
router.get('/student', getAllStudents)
router.get('/student/:id', getStudentById)
router.put('/student/:id', updateStudent)
router.delete('/student/:id', deleteStudent)

export default router