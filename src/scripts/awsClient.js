import AWS from "aws-sdk";

const config = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION,
};


AWS.config.update(config);

const s3 = new AWS.S3({ endpoint: "s3.amazonaws.com" });
const dynamodb = new AWS.DynamoDB();

export { s3, dynamodb };
