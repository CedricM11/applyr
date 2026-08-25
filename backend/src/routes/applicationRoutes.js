import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.post("/", createApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;