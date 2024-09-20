import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

export const createProctoring = async (req: Request, res: Response) => {
    try {
        const proctoring = await prisma.proctoring.create({
            data: req.body
        })
        return res.status(200).json({msg: "Proctoring started", proctoring})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({msg: err.message})
    }
}

export const getAllProctoringBySubmissionId = async (req: Request, res: Response) => {
    try {
        const proctoring = await prisma.proctoring.findMany({
            where: {
                submissionId: req.params.id
            }
        })
        if(!proctoring) {
            return res.status(404).json({msg: "No proctoring found for this submission"})
        }
        return res.status(200).json(proctoring)
    } catch (err) {
        logger.error(err)
        return res.status(500).json({msg: err.message})
    }
}

export const getProctoringById = async (req: Request, res: Response) => {
    try {
        const proctoring = await prisma.proctoring.findUnique({
            where: {
                id: req.params.id
            }
        })

        if(!proctoring) {
            return res.status(404).json({msg: "Proctoring not found"})
        }

        return res.status(200).json(proctoring)

    } catch (err) {
        logger.error(err)
        return res.status(500).json({msg: err.message})
    }
}

export const updateProctoring = async (req: Request, res: Response) => {
    try {
        const proctoring = await prisma.proctoring.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })

        if(!proctoring) {
            return res.status(404).json({msg: "Proctoring not found"})
        }

        return res.status(200).json({msg: "Proctoring updated successfully", proctoring})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({msg: err.message})
    }
}