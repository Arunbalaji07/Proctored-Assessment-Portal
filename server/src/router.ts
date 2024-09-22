import {Router} from "express";
import {createAdmin, deleteAdmin, getAdminById, getAllAdmin, updateAdmin} from "./handlers/admin";
import {
    createEducator,
    deleteEducator,
    educatorLogOut, getAllEducatorLogs,
    getAllEducators,
    getEducatorById,
    updateEducator
} from "./handlers/educator";
import {
    deleteStudent, getAllStudentLogs,
    getAllStudents,
    getStudentById,
    studentLogOut,
    updateStudent
} from "./handlers/student";
import {
    createAssessment,
    deleteAssessment,
    getAllAssessment, getAssessmentByCategory,
    getAssessmentById,
    updateAssessment
} from "./handlers/assessment";
import {
    createQuestion,
    deleteQuestion,
    getAllQuestionsByAssessmentId,
    getQuestionById,
    updateQuestion
} from "./handlers/question";
import {
    createSubmission,
    deleteSubmission,
    getAllSubmissionsByAssessmentId,
    getSubmissionById,
    updateSubmission
} from "./handlers/submission";
import {createAnswer, deleteAnswer, getAllAnswersBySubmissionId, getAnswerById, updateAnswer} from "./handlers/answer";
import {
    createProctoring,
    getAllProctoringBySubmissionId,
    getProctoringById,
    updateProctoring
} from "./handlers/proctoring";
import {createReport, getReportById, getReportBySubmissionId} from "./handlers/report";
import {createSummary, getSummaryByAssessmentId} from "./handlers/summary";

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
router.get('/educator/logs', getAllEducatorLogs)
router.post('/educator', createEducator)
router.post('/educator/logout', educatorLogOut)
router.put('/educator/:id', updateEducator)
router.delete('/educator/:id', deleteEducator)

// STUDENT ROUTES
router.get('/student', getAllStudents)
router.get('/student/:id', getStudentById)
router.get('/students/logs', getAllStudentLogs)
router.post('/student/logout', studentLogOut)
router.put('/student/:id', updateStudent)
router.delete('/student/:id', deleteStudent)

// ASSESSMENT ROUTES
router.get('/assessment', getAllAssessment)
router.get('/assessment/:id', getAssessmentById)
router.get('/assessment/category/:category', getAssessmentByCategory)
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
router.get('/assessment/:assessmentId/submission', getAllSubmissionsByAssessmentId)
router.get('/submission/:id', getSubmissionById)
router.post('/submission', createSubmission)
router.put('/submission/:id', updateSubmission)
router.delete('/submission/:id', deleteSubmission)

// ANSWER ROUTES
router.get('/submissions/:submissionId/answers', getAllAnswersBySubmissionId)
router.get('/answer/:id', getAnswerById)
router.post('/answer', createAnswer)
router.put('/answer/:id', updateAnswer)
router.delete('/answer/:id', deleteAnswer)

// PROCTORING ROUTES
router.get('/submission/:submissionId/proctoring', getAllProctoringBySubmissionId)
router.get('/proctoring/:id', getProctoringById)
router.post('/proctoring', createProctoring)
router.put('/proctoring/:id', updateProctoring)

// REPORT ROUTES
router.get('/submission/:submissionId/report', getReportBySubmissionId)
router.get('/report/:id', getReportById)
router.post('/report', createReport)

// ASSESSMENT SUMMARY ROUTES
router.get('/assessment/:assessmentId/summary', getSummaryByAssessmentId)
router.post('/assessment/:assessmentId/summary', createSummary)

export default router