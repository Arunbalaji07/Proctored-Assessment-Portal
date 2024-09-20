import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

export const createSubmission = async (req: Request, res: Response) => {
    try {
        // Check if a submission already exists for the given studentId and assessmentId
        const previousCount = await prisma.submission.count({
            where: {
                AND: [
                    { studentId: req.body.studentId },
                    { assessmentId: req.body.assessmentId }
                ]
            }
        })

        if (previousCount > 0) {
            return res.status(400).json({ msg: "Only one attempt is allowed for each user" })
        }

        // Create the new submission
        const submission = await prisma.submission.create({
            data: req.body
        })

        // Count the current number of submissions after creation
        const currentCount = await prisma.submission.count({
            where: {
                AND: [
                    { studentId: req.body.studentId },
                    { assessmentId: req.body.assessmentId }
                ]
            }
        })

        return res.status(200).json({ msg: "Submission created successfully", submission, count: currentCount })
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
}


// GET SUBMISSION FOR SPECIFIC ASSESSMENT
export const getAllSubmissionsByAssessmentId = async (req: Request, res: Response) => {
    try {
        const submissions = await prisma.submission.findMany({
            where: {
                assessmentId: req.params.assessmentId
            },
            include: {
                student: {
                    select: {
                        fullName: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true
                    }
                },
                answers: true,
                proctoring: true,
                report: true
            }
        });

        if (submissions.length === 0) {
            return res.status(404).json({msg: "No submissions found"});
        }
        return res.status(200).json(submissions)
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const getSubmissionById = async (req: Request, res: Response) => {
    try {
        const submission = await prisma.submission.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                answers: true,
                assessment: true
            }
        })

        if (!submission) {
            return res.status(404).json({msg: "Submission not found"});
        }

        return res.status(200).json({data: submission});

    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const updateSubmission = async (req: Request, res: Response) => {
    try {
        const findSubmission = await prisma.submission.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!findSubmission) {
            return res.status(404).json({msg: "Submission not found"});
        }

        const submission = await prisma.submission.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });

        return res.status(200).json({msg: "Submission updated successfully", data: submission});

    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

// TODO: DELETE SUBMISSION IS NOT USED BUT WHILE USING IT ADD onDelete: cascade in schema.prisma FILE FOR NECESSARY TABLES.
// THIS ROUTE IS NOT CURRENTLY USED SO THIS ROUTE IS NOT TESTED YET
export const deleteSubmission = async (req: Request, res: Response) => {
    try {
        const submission = await prisma.submission.delete({
            where: {
                id: req.params.id
            }
        })
        if (!submission) {
            return res.status(404).json({msg: "Submission not found"});
        }
        return res.status(200).json({msg: "Submission deleted successfully"})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}