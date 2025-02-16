import express from "express";
import { getNFTById, getNFTsByWallet, storeNFT } from "./nft.controller";

const router = express.Router();

router.post("/store", storeNFT);
router.get("/:nftId", getNFTById);
router.get("/wallet/:walletAddress", getNFTsByWallet);

export const nftRoutes = router;
