import { Request, Response } from "express";
import prisma from "../db";
import logger from "../logger";

export const createAnswer = async (req: Request, res: Response) => {
    try {
        const answer = await prisma.answer.create({
            data: req.body
        })
        return res.status(200).json({ msg: "Answer submitted successfully", answer });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
}

// export const getAllAnswerBySubmissionId = async (req: Request, res: Response) => {
//     try {
//         const answers = await prisma.answer.findMany({
//             where: {
//                 submissionId: req.params.submissionId
//             },
//             include: {
//                 question: true
//             }
//         })
//
//         logger.info(answers)
//
//         if(!answers) {
//             return res.status(404).json({ msg: "No answers found for this submission" });
//         }
//         return res.status(200).json(answers);
//
//     } catch (err) {
//         logger.error(err);
//         return res.status(500).json({ msg: err.message });
//     }
// }

export const getAllAnswersBySubmissionId = async (req: Request, res: Response) => {
    try {
        const answers = await prisma.answer.findMany({
            where: {
                submissionId: req.params.submissionId
            },
            include: {
                question: true
            }
        });

        if (answers.length === 0) {
            return res.status(404).json({ msg: "No answers found for this submission" });
        }

        return res.status(200).json(answers);

    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
};


export const getAnswerById = async (req: Request, res: Response) => {
    try {
        const answer = await prisma.answer.findUnique({
            where: {
                id: req.params.id
            }
        })

        if(!answer) {
            return res.status(404).json({ msg: "Answer not found" });
        }

        return res.status(200).json(answer);

    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
}

export const updateAnswer = async (req: Request, res: Response) => {
    try {
        const findAnswer = await prisma.answer.findUnique({
            where: {
                id: req.params.id
            }
        })

        if(!findAnswer) {
            return res.status(404).json({ msg: "Answer not found" });
        }

        const answer = await prisma.answer.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })

        return res.status(200).json({ msg: "Answer updated successfully", data: answer });

    } catch (err) {
        logger.error(err)
        return res.status(500).json({ msg: err.message });
    }
}

// TODO: DELETE ANSWER IS CURRENTLY NOT USED SO THIS ROUTE IS NOT TESTED YET
export const deleteAnswer = async (req: Request, res: Response) => {
    try {
        const answer = await prisma.answer.delete({
            where: {
                id: req.params.id
            }
        })

        if(!answer) {
            return res.status(404).json({ msg: "Answer not found" });
        }

        return res.status(200).json({ msg: "Answer deleted successfully" });
    } catch (err) {
        logger.error(err)
        return res.status(500).json({ msg: err.message });
    }
}