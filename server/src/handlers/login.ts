import { Request, Response} from "express";

import logger from "../logger";
import {adminLogin} from "./admin";
import {educatorLogin} from "./educator";
import {studentLogin} from "./student";

export const login = async (req: Request, res:Response) => {
    try {
        const role = req.params.role;

        switch (role) {
            case "admin":
                return await adminLogin(req, res)
            case "educator":
                return await educatorLogin(req, res)
            case "student":
                return await studentLogin(req, res)
        }
    } catch (err) {
        logger.error(err);
        return res.status(400).json({ error: "Bad request" });
    }
}