import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

// export const createSummary = async (req: Request, res: Response) => {
//     try {
//         const { assessmentId } = req.params;
//         console.log(`Received assessmentId: ${assessmentId}`);
//
//         // Get all submissions for the assessment
//         const submissions = await prisma.submission.findMany({
//             where: {
//                 assessmentId
//             },
//             select: {
//                 score: true
//             }
//         });
//
//         console.log(`Submissions for assessmentId ${assessmentId}:`, submissions);
//
//         // If no submissions are found, return an appropriate message
//         const totalSubmissions = submissions.length;
//         if (totalSubmissions === 0) {
//             return res.status(404).json({ msg: "No submissions found for this assessment" });
//         }
//
//         // Extract all scores from submissions
//         const scores = submissions.map(submission => submission.score);
//
//         // Perform manual calculations for max, min, and average
//         const maxScore = Math.max(...scores);
//         const minScore = Math.min(...scores);
//         const averageScore = scores.reduce((acc, score) => acc + score, 0) / totalSubmissions;
//
//         console.log(`Max score: ${maxScore}, Min score: ${minScore}, Average score: ${averageScore}`);
//
//         // Create the assessment summary using the calculated stats
//         const summary = await prisma.assessmentSummary.create({
//             data: {
//                 assessmentId,
//                 totalSubmissions,
//                 averageScore,
//                 maxScore,
//                 minScore,
//             }
//         });
//
//         console.log(`Summary created for assessmentId ${assessmentId}:`, summary);
//
//         return res.status(201).json(summary);
//     } catch (err) {
//         console.error("Error creating assessment summary:", err);
//         return res.status(500).json({ msg: err.message });
//     }
// };

export const createSummary = async (req: Request, res: Response) => {
    try {
        const { assessmentId } = req.params;
        console.log(`Received assessmentId: ${assessmentId}`);

        // Get all submissions for the assessment
        const submissions = await prisma.submission.findMany({
            where: {
                assessmentId
            },
            select: {
                score: true
            }
        });

        console.log(`Submissions for assessmentId ${assessmentId}:`, submissions);

        // If no submissions are found, return an appropriate message
        const totalSubmissions = submissions.length;
        if (totalSubmissions === 0) {
            return res.status(404).json({ msg: "No submissions found for this assessment" });
        }

        // Extract all scores from submissions
        const scores = submissions.map(submission => submission.score);

        // Perform manual calculations for max, min, and average
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        const averageScore = scores.reduce((acc, score) => acc + score, 0) / totalSubmissions;

        console.log(`Max score: ${maxScore}, Min score: ${minScore}, Average score: ${averageScore}`);

        // Use upsert to either create or update the assessment summary
        const summary = await prisma.assessmentSummary.upsert({
            where: { assessmentId },  // Unique constraint on assessmentId
            update: {
                totalSubmissions,
                averageScore,
                maxScore,
                minScore
            },
            create: {
                assessmentId,
                totalSubmissions,
                averageScore,
                maxScore,
                minScore
            }
        });

        console.log(`Summary created/updated for assessmentId ${assessmentId}:`, summary);

        return res.status(201).json(summary);
    } catch (err) {
        console.error("Error creating/updating assessment summary:", err);
        return res.status(500).json({ msg: err.message });
    }
};




export const getSummaryByAssessmentId = async (req: Request, res: Response) => {
    try {
        const summary = await prisma.assessmentSummary.findFirst({
            where: {
                assessmentId: req.params.id,
            }
        })

        if(!summary) {
            return res.status(404).json({msg: "Assessment summary not found"})
        }
        return res.status(200).json(summary)

    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
}