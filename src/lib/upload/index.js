const {
  S3Client,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');




// Initialize S3 Client for R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});



const createPresignedUrlWith_R2_Client = ({ bucket, key }) => {
 
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
  });


  return getSignedUrl(s3, command, {
    expiresIn: 3600, // 1 hour
  });
};


module.exports = createPresignedUrlWith_R2_Client