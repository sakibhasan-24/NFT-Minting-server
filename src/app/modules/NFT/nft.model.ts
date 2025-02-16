import mongoose, { Schema } from "mongoose";
import { INFT } from "./nft.interface";

const nftSchema = new Schema<INFT>(
  {
    nftName: { type: String, required: true },
    nftDescription: { type: String, required: true },
    nftLogoUrl: { type: String, required: true },
    nftId: { type: Number, required: true },
    userWalletAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const nftModel = mongoose.model<INFT>("NFT", nftSchema);

export default nftModel;
