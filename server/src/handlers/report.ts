import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

export const createReport = async (req: Request, res: Response) => {
    try {
        const report = await prisma.report.create({
            data: req.body
        })
        return res.status(200).json({msg: "Report generated successfully", report});
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const getReportBySubmissionId = async (req: Request, res: Response) => {
    try {
        const reports = await prisma.report.findMany({
            where: {
                submissionId: req.params.submissionId
            }
        })
        if(!reports) {
            return res.status(404).json({msg: "No reports found for this submission"});
        }
        return res.status(200).json(reports)
    } catch (err) {
        logger.error(err)
        return res.status(500).json({msg: err.message});
    }
}

export const getReportById = async (req: Request, res: Response) => {
    try {
        const report = await prisma.report.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(!report) {
            return res.status(404).json({msg: "No report found with this ID"});
        }
        return res.status(200).json(report)
    } catch (err) {
        logger.error(err)
        return res.status(500).json({msg: err.message});
    }
}