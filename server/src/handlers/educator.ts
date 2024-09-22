import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

import {comparePassword, createJWTEducator, hashPassword} from "../modules/auth";

export const createEducator = async (req: Request, res: Response) => {
    try {
        const {fullName, email, password} = req.body

        const isUserExist = await prisma.educator.findUnique({
            where: {
                email
            }
        })

        if (isUserExist) {
            return res.status(400).json({msg: "User already exists"});
        }

        const educator = await prisma.educator.create({
            data: {
                fullName,
                email,
                password: await hashPassword(password)
            }
        })

        await prisma.educatorLog.create({
            data: {
                educatorId: educator.id,
                action: "Educator signed up successfully."
            }
        })

        return res.status(200).json({msg: "Educator created successfully", educator})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const educatorLogin = async (req: Request, res: Response) => {
    const educator = await prisma.educator.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (!educator) {
        return res.status(400).json({msg: "Incorrect email id"});
    }

    const isPasswordValid = await comparePassword(req.body.password, educator.password)

    if (isPasswordValid) {
        logger.info("Educator successfully logged in");
        const token = createJWTEducator(educator)

        await prisma.educatorLog.create({
            data: {
                educatorId: educator.id,
                action: "Educator logged in successfully."
            }
        })

        return res.status(200).json({token})
    } else {
        return res.status(400).json({msg: "Incorrect password"});
    }
}

export const getAllEducators = async (_req: Request, res: Response) => {
    try {
        const educators = await prisma.educator.findMany()

        if (educators.length === 0) {
            return res.status(404).json({msg: "Not even a single educators exist"})
        }
        return res.status(200).json(educators)
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}

export const getEducatorById = async (req: Request, res: Response) => {
    try {
        const educator = await prisma.educator.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                assessments: true
            }
        })

        if (!educator) {
            return res.status(404).json({msg: "Educator not found"})
        }

        return res.status(200).json({data: educator})
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}

export const updateEducator = async (req: Request, res: Response) => {
    try {
        const updateData: any = {
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            gender: req.body.gender
        };

        if (req.body.password) {
            updateData.password = await hashPassword(req.body.password);
        }

        const educator = await prisma.educator.update({
            where: {
                id: req.params.id
            },
            data: updateData
        });

        return res.status(200).json({msg: "Educator details updated successfully", data: educator});
    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
};

export const deleteEducator = async (req: Request, res: Response) => {
    try {
        const educator = await prisma.educator.delete({
            where: {
                id: req.params.id
            }
        })
        if (!educator) {
            return res.status(404).json({error: 'Educator not found'})
        }
        return res.status(200).json({msg: "Educator deleted successfully"})
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}

export const educatorLogOut = async (educatorId: string) => {
    try {
        await prisma.educatorLog.create({
            data: {
                educatorId,
                action: 'Educator logged out successfully.'
            }
        })
    } catch (err) {
        logger.error(err)
    }
}

export const getAllEducatorLogs = async (req: Request, res: Response) => {
    try {
        const educatorLogs = await prisma.educatorLog.findMany({
            include: {
                educator: {
                    select: {
                        fullName: true,
                        id: true
                    }
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        })
        return res.status(200).json(educatorLogs)
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}