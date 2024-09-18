import {Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

import {comparePassword, createJWTStudent, hashPassword} from "../modules/auth";

export const createStudent = async (req: Request, res: Response) => {
    try {
        const studentExists = await prisma.student.findUnique({
            where: {
                email: req.body.email
            }
        })

        if(studentExists) {
            return res.status(400).json({ error: 'Student with this email id already exists'});
        }

        const student = await prisma.student.create({
            data: {
                fullName: req.body.fullName,
                email: req.body.email,
                password: await hashPassword(req.body.password),
            }
        })
        return res.status(200).json({msg: "Student created successfully", student})

    } catch (err) {
        logger.error(err);
        return res.status(500).json({msg: err.message});
    }
}

export const studentLogin = async (req:Request, res:Response) => {
    const student = await prisma.student.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (!student) {
        return res.status(400).json({msg: "Incorrect email id"});
    }

    const isPasswordValid = await comparePassword(req.body.password, student.password)

    if (isPasswordValid) {
        logger.info("Student successfully logged in");
        const token = createJWTStudent(student)
        return res.status(200).json({token})
    } else {
        return res.status(400).json({msg: "Incorrect password"});
    }
}

export const getAllStudents = async (_req: Request, res: Response) => {
    try {
        const students = await prisma.student.findMany()

        if (students.length === 0) {
            return res.status(404).json({msg: "Not even a single students exist"})
        }
        return res.status(200).json(students)
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}

export const getStudentById = async (req: Request, res: Response) => {
    try {
        const student = await prisma.student.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                submissions: true
            }
        })

        if (!student) {
            return res.status(404).json({msg: "Student not found"})
        }

        return res.status(200).json({data: student})
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const updateData: any = {
            fullName: req.body.fullName,
            email: req.body.email
        };

        if (req.body.password) {
            updateData.password = await hashPassword(req.body.password);
        }

        const student = await prisma.student.update({
            where: {
                id: req.params.id
            },
            data: updateData
        });

        return res.status(200).json({ msg: "Student details updated successfully", data: student });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const student = await prisma.student.delete({
            where: {
                id: req.params.id
            }
        })
        if (!student) {
            return res.status(404).json({error: 'Student not found'})
        }
        return res.status(200).json({msg: "Student deleted successfully"})
    } catch (err) {
        logger.error(err)
        res.status(500).json({msg: err.message})
    }
}