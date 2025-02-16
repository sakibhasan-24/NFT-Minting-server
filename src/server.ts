import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
  await mongoose.connect(config.DBURL as string);
  app.listen(config.port, () => {
    console.log(`NFT-Minting app listening on port ${config.port}`);
  });
}
main();
