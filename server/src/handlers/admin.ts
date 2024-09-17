import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger"

import {comparePassword, createJWTAdmin, hashPassword} from "../modules/auth";

export const createDefaultAdmin = async () => {
    try {
        const adminFullName = process.env.ADMIN_FULLNAME
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminFullName || !adminEmail || !adminPassword) {
            throw new Error("Missing required environment variables for default admin creation")
        }

        const adminCount = await prisma.admin.count()
        logger.info("Admin count: " + adminCount)

        if (adminCount === 0) {
            const admin = await prisma.admin.create({
                data: {
                    fullName: adminFullName,
                    email: adminEmail,
                    password: await hashPassword(adminPassword)
                }
            })

            logger.info("Admin created successfully with default credentials")
        }

    } catch (err) {
        logger.info("Failed to create admin with default credentials")
        logger.error(err.message || err.toString())
    }
}

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const adminExists = await prisma.admin.findUnique({
            where: {
                email: req.body.email,
            }
        })

        if (adminExists) {
            return res.status(400).json({error: "Admin with this email id already exists"})
        }

        const admin = await prisma.admin.create({
            data: {
                fullName: req.body.fullName,
                email: req.body.email,
                password: await hashPassword(req.body.password)
            }
        })

        return res.status(200).json({msg: "Admin created successfully", admin})

    } catch (err) {
        logger.info("Error from Create Admin Handler")
        logger.error(err.message || err.toString())
        return res.status(500).json({error: "Internal Server Error"})
    }
}

export const adminLogin = async (req: Request, res: Response) => {
    const admin = await prisma.admin.findUnique({
        where: {
            email: req.body.email,
        }
    })

    if (!admin) {
        return res.status(400).json({msg: "Admin not found"})
    }

    const isPasswordValid = await comparePassword(req.body.password, admin.password);

    if (isPasswordValid) {
        logger.info("Admin successfully logged in");
        const token = createJWTAdmin(admin)
        return res.status(200).json({token})
    } else {
        return res.status(400).json({msg: "Incorrect password"})
    }
}

export const getAllAdmin = async (_req: Request, res: Response) => {
    try {
        const admins = await prisma.admin.findMany()

        if (admins.length === 0) {
            return res.status(404).json({msg: "Not even a single admin exist"})
        }
        return res.status(200).json({data: admins})
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}

export const getAdminById = async (req: Request, res: Response) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!admin) {
            return res.status(404).json({msg: "Admin not found"})
        }

        return res.status(200).json({data: admin})
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}

export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const updateData: any = {
            fullName: req.body.fullName,
            email: req.body.email
        };

        if (req.body.password) {
            updateData.password = await hashPassword(req.body.password);
        }

        const admin = await prisma.admin.update({
            where: {
                id: req.params.id
            },
            data: updateData
        });

        return res.status(200).json({ msg: "Admin details updated successfully", data: admin });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await prisma.admin.delete({
            where: {
                id: req.params.id
            }
        })
        if (!admin) {
            return res.status(404).json({error: 'Admin not found'})
        }
        return res.status(200).json({msg: "Admin deleted successfully"})
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}