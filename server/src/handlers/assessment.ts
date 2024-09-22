import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

export const createAssessment = async (req: Request, res: Response) => {
    const { educatorId } = req.body; // Destructure educatorId from req.body

    try {
        // Check if the educator exists
        const educator = await prisma.educator.findUnique({
            where: { id: educatorId },
        });

        if (!educator) {
            return res.status(404).json({ msg: 'Educator not found' });
        }

        // Create the assessment
        const assessment = await prisma.assessment.create({
            data: req.body,
        });

        // Log the educator's action
        await prisma.educatorLog.create({
            data: {
                educatorId: assessment.educatorId,
                action: "Created an assessment.",
            },
        });

        return res.status(200).json({ msg: "Assessment created successfully", assessment });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
};


export const getAllAssessment = async (_req: Request, res: Response) => {
    try {
        const assessments = await prisma.assessment.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        if (assessments.length === 0) {
            return res.status(404).json({msg: "No assessment found"});
        }
        return res.status(200).json(assessments);
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const getAssessmentByEducatorId = async (req: Request, res: Response) => {
    try{
        const assessment = await prisma.assessment.findMany({
            where: {
                educatorId: req.params.id
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                submissions: true,
                questions: true
            }
        })

        if (assessment.length === 0) {
            return res.status(404).json({msg: "No assessment found"});
        }

        const studentCount = await prisma.student.count()
        const submissionCount = assessment[0].submissions.length

        const totalQuestions = assessment[0].questions.length

        return res.status(200).json({assessment: assessment[0], studentCount, submissionCount, totalQuestions});
    } catch(err){
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const getAssessmentById = async (req: Request, res: Response) => {
    try {
        const assessment = await prisma.assessment.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                questions: {
                    select: {
                        mark: true
                    }
                }
            }
        })

        const questionCount = await prisma.question.count({
            where: {
                assessmentId: assessment.id
            }
        })

        if (!assessment) {
            return res.status(404).json({msg: "Assessment not found"});
        }

        return res.status(200).json({questionCount, assessment});
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const getAssessmentByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params

        const assessments = await prisma.assessment.findMany({
            where: {
                category
            },
            include: {
                submissions: true
            }
        })

        if (assessments.length === 0) {
            return res.status(404).json({ message: 'No assessments found for this category' });
        }

        return res.status(200).json(assessments);

    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const updateAssessment = async (req: Request, res: Response) => {
    try {
        const findAssessment = await prisma.assessment.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!findAssessment) {
            return res.status(404).json({msg: "Assessment not found"})
        }

        const assessment = await prisma.assessment.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })

        return res.status(200).json({msg: "Assessment details updated successfully", data: assessment})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const deleteAssessment = async (req: Request, res: Response) => {
    try {
        const assessment = await prisma.assessment.delete({
            where: {
                id: req.params.id
            }
        })
        if (!assessment) {
            return res.status(404).json({msg: "Assessment not found"});
        }
        return res.status(200).json({msg: "Assessment deleted successfully"})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}