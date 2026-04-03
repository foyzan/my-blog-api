const createPresignedUrlWith_R2_Client = require("../../../lib/upload");
const { v4: uuidv4 } = require("uuid");
const logger = require("../../../utils/logger");
const { badRequest } = require("../../../utils/error");

const getPreSignUrl = async (req, res, next) => {
  try {
    const { mimetype } = req.body;

    // 1. Validation: Ensure mimetype is provided
    if (!mimetype || typeof mimetype !== "string") {
      throw badRequest("A valid mimetype is required");
    }

    // 2. Security: Filter allowed mimetypes
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(mimetype)) {
      throw badRequest("Unsupported file type. Please upload an image (JPG, PNG, WEBP, or GIF).");
    }

    // 3. Robust extension extraction
    const extension = mimetype.split("/")[1];
    const random = uuidv4();
    const filename = `uploads/${random}.${extension}`;

    const url = await createPresignedUrlWith_R2_Client({
      bucket: process.env.AWS_S3_BUCKET_NAME,
      key: filename,
    });

    res.status(200).json({ url, filename });
  } catch (error) {
    // 4. Use the centralized logger for production-grade tracing
    logger.error("S3 Presigned URL Generation Failed", {
      message: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

module.exports = getPreSignUrl;