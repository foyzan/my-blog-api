const createPresignedUrlWith_R2_Client = require("../../../lib/upload");
const { v4: uuidv4 } = require("uuid");

const getPreSignUrl = async (req, res, next)=>{

    try {
    const { mimetype } = req.body;
    const random = uuidv4();
    const filename = `uploads/${random}.${mimetype.split("/")[1]}`;

    const url = await createPresignedUrlWith_R2_Client({
      bucket: process.env.AWS_S3_BUCKET_NAME,
      key: filename,
    });

    res.json({ url, filename });
  } catch (error) {
    console.error("S3 Presigned URL Error:", error);
    next(error);
  }

}



module.exports = getPreSignUrl;