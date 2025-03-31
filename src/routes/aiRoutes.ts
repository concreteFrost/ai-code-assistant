import { Router } from "express";
import { sendRequest } from "../controllers/aiController";

const aiRoutes = Router();

aiRoutes.post("/submit", sendRequest);

export default aiRoutes;
