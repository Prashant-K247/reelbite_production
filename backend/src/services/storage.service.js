import dotenv from "dotenv"
dotenv.config();
import ImageKit, { toFile } from "@imagekit/nodejs";

const imagekit = new ImageKit({
    public_key: process.env.IMAGEKIT_PUBLIC_KEY,
    private_key: process.env.IMAGEKIT_PRIVATE_KEY,
    url_endpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

export const uploadFile = async (buffer, fileName) => {
    try {

        console.log("Creating file...");

        const file = await toFile(buffer, fileName);

        console.log("Uploading to ImageKit...");

        const result = await imagekit.files.upload({
            file,
            fileName
        });

        console.log("Upload complete");

        return result;

    } catch (err) {
        console.error("ImageKit Error");
        console.error(err);
        throw err;
    }
};