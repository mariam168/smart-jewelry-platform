
import express from "express";

import {
  adminLoginController,
} from "../controllers/adminAuthController.js";


const router =
  express.Router();


router.post(
  "/login",
  adminLoginController
);


export default router;
