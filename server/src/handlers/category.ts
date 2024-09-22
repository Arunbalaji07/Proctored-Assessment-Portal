import { Request, Response} from "express";
import prisma from "../db";
import logger from "../logger";

export const createCategory = async (req: Request, res: Response) => {
    const { title } = req.body;

    try {
        // Check if a category with the same title (case-insensitive) already exists
        const existingCategory = await prisma.category.findFirst({
            where: {
                title: {
                    equals: title,
                    mode: 'insensitive' // Case-insensitive search
                }
            }
        });

        if (existingCategory) {
            return res.status(400).json({ msg: "Category with this title already exists." });
        }

        // If no such category exists, create a new one
        const category = await prisma.category.create({
            data: req.body
        });

        return res.status(200).json({ msg: "Category created successfully", category });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
};

export const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                title: 'asc'
            }
        })
        return res.status(200).json(categories);
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: err.message });
    }
}