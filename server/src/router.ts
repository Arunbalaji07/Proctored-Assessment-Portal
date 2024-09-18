import {Router} from "express";
import {createAdmin, deleteAdmin, getAdminById, getAllAdmin, updateAdmin} from "./handlers/admin";
import {createEducator, deleteEducator, getAllEducators, getEducatorById, updateEducator} from "./handlers/educator";
import {deleteStudent, getAllStudents, getStudentById, updateStudent} from "./handlers/student";
import {
    createAssessment,
    deleteAssessment,
    getAllAssessment,
    getAssessmentById,
    updateAssessment
} from "./handlers/assessment";
import {createQuestion, deleteQuestion, getAllQuestionsByAssessmentId, getQuestionById, updateQuestion} from "./handlers/question";
import {
    createSubmission,
    deleteSubmission,
    getAllSubmissionsByAssessmentId,
    getSubmissionById,
    updateSubmission
} from "./handlers/submission";

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

// ASSESSMENT ROUTES
router.get('/assessment', getAllAssessment)
router.get('/assessment/:id', getAssessmentById)
router.post('/assessment', createAssessment)
router.put('/assessment/:id', updateAssessment)
router.delete('/assessment/:id', deleteAssessment)

// QUESTION ROUTES
router.get('/assessment/:assessmentId/question', getAllQuestionsByAssessmentId)
router.get('/question/:id', getQuestionById)
router.post('/question', createQuestion)
router.put('/question/:id', updateQuestion)
router.delete('/question/:id', deleteQuestion)

// SUBMISSION ROUTES
router.get('/submissions/:assessmentId', getAllSubmissionsByAssessmentId)
router.get('/submission/:id', getSubmissionById)
router.post('/submission', createSubmission)
router.put('/submission/:id', updateSubmission)
router.delete('/submission/:id', deleteSubmission)


export default router