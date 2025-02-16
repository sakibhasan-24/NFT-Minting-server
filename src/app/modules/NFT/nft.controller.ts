import { Request, Response } from "express";
import nftModel from "./nft.model";
import { INFT } from "./nft.interface"; // Importing the NFT interface

// Standard API response format
interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Store NFT data
export const storeNFT = async (
  req: Request,
  res: Response<ApiResponse<INFT>>
) => {
  try {
    const { nftName, nftDescription, nftLogoUrl, nftId, userWalletAddress } =
      req.body;

    if (
      !nftName ||
      !nftDescription ||
      !nftLogoUrl ||
      !nftId ||
      !userWalletAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if NFTID already exists or noit
    const existingNFT = await nftModel.findOne({ nftId });
    if (existingNFT) {
      return res.status(409).json({
        success: false,
        message: "NFT with this ID already exists",
      });
    }

    // create
    const nft = new nftModel({
      nftName,
      nftDescription,
      nftLogoUrl,
      nftId,
      userWalletAddress,
    });

    await nft.save();

    return res.status(201).json({
      success: true,
      message: "NFT stored successfully",
      data: nft,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

// Get NFT by ID
export const getNFTById = async (
  req: Request,
  res: Response<ApiResponse<INFT>>
) => {
  try {
    const nftId = parseInt(req.params.nftId, 10);
    if (isNaN(nftId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid NFT ID",
      });
    }

    const nft = await nftModel.findOne({ nftId });
    console.log(nft);

    if (!nft) {
      return res.status(404).json({
        success: false,
        message: "NFT not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "NFT retrieved successfully",
      data: nft,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

// Get NFTs by Wallet Address
export const getNFTsByWallet = async (
  req: Request,
  res: Response<ApiResponse<INFT[]>>
) => {
  try {
    const { userWalletAddress } = req.params;

    if (!userWalletAddress) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required",
      });
    }

    const nfts = await nftModel.find({ userWalletAddress });

    if (!nfts.length) {
      return res.status(404).json({
        success: false,
        message: "No NFTs found for this wallet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "NFTs retrieved successfully",
      data: nfts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
