import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger"

export const createQuestion = async (req: Request, res: Response) => {
    try {
        const question = await prisma.question.create({
            data: req.body
        })
        return res.status(200).json({msg: "Question created successfully", question})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

// GET ALL QUESTIONS BY ASSESSMENT ID
export const getAllQuestionsByAssessmentId = async (req: Request, res: Response) => {
    try {
        const questions = await prisma.question.findMany({
            where: {
                assessmentId: req.params.assessmentId,
            }
        })

        if (!questions) {
            return res.status(404).json({msg: "Questions not found"})
        }
        return res.status(200).json(questions)
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const getQuestionById = async (req: Request, res: Response) => {
    try {
        const question = await prisma.question.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!question) {
            return res.status(404).json({msg: "Question not found"})
        }
        return res.status(200).json({question})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const updateQuestion = async (req: Request, res: Response) => {
    try {
        const findQuestion = await prisma.question.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!findQuestion) {
            return res.status(404).json({msg: "Question not found"})
        }

        const question = await prisma.question.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })
        return res.status(200).json({msg: "Question updated successfully", data: question})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const question = await prisma.question.delete({
            where: {
                id: req.params.id
            }
        })
        if (!question) {
            return res.status(404).json({msg: "Question not found"})
        }
        return res.status(200).json({msg: "Question deleted successfully"})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}