import {Router} from "express";
import {createAdmin, deleteAdmin, getAdminById, getAllAdmin, updateAdmin} from "./handlers/admin";

const router = Router()

// ADMIN ROUTES
router.get('/admin', getAllAdmin)
router.get('/admin/:id', getAdminById)
router.post('/admin', createAdmin)
router.put('/admin/:id', updateAdmin)
router.delete('/admin/:id', deleteAdmin)


export default router