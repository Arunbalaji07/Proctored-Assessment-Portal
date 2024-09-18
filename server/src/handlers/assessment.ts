import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

export const createAssessment = async (req: Request, res: Response) => {
    try {
        const assessment = await prisma.assessment.create({
            data: req.body
        })
        return res.status(200).json({msg: "Assessment created successfully", assessment})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

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

export const getAssessmentById = async (req: Request, res: Response) => {
    try {
        const assessment = await prisma.assessment.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                questions: true,
                submissions: true
            }
        })

        if (!assessment) {
            return res.status(404).json({msg: "Assessment not found"});
        }

        return res.status(200).json({data: assessment});
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