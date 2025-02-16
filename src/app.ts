import express from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import morgan from "morgan";
import { specs } from "./app/swagger/swagger";
import { nftRoutes } from "./app/modules/NFT/nft.routes";

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the REST API!" });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes

app.use("/nft", nftRoutes);

export default app;
