import express from "express";
const app = express();
import cors from "cors";

// const port = 3000;
app.use(express.json());
app.use(cors());

export default app;
