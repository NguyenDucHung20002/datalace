import Cookies from "js-cookie";
import { s3 } from "./awsClient.js";
import axios from "axios";
var api = axios.create({
  // baseURL: 'http://localhost:8000',
  // baseURL: "https://datalace.org/api",
  //baseURL: "http://18.219.44.230",
  baseURL: process.env.REACT_APP_API,
});
export async function uploadLargeFile(bucketName, objectName, file) {
  // console.log("uploadLargeFile function called");
  const params = {
    Bucket: bucketName,
    Key: objectName,
  };
  // console.log("Starting multipart upload...");

  try {
    const createMultipartUploadResponse = await s3
      .createMultipartUpload(params)
      .promise();
    var uploadId = createMultipartUploadResponse.UploadId;
    const partSize = 5 * 1024 * 1024; // 5MB
    const parts = [];
    const uploadMutex = {
      isUploading: false,
    };
    const uploadNextPart = async (partNumber) => {
      if (uploadMutex.isUploading) {
        setTimeout(() => uploadNextPart(partNumber), 1);
        return;
      }

      uploadMutex.isUploading = true;
      const start = (partNumber - 1) * partSize;
      const end = Math.min(partNumber * partSize, file.size);
      const partData = file.slice(start, end);

      if (partData.size > 0) {
        const uploadPartResponse = await s3
          .uploadPart({
            Bucket: bucketName,
            Key: objectName,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: partData,
          })
          .promise();
        parts.push({ PartNumber: partNumber, ETag: uploadPartResponse.ETag });
        uploadMutex.isUploading = false;
        await uploadNextPart(partNumber + 1);
      } else {
        await s3
          .completeMultipartUpload({
            Bucket: bucketName,
            Key: objectName,
            UploadId: uploadId,
            MultipartUpload: { Parts: parts },
          })
          .promise();

        // console.log("Multipart upload completed successfully");
      }
    };
    await uploadNextPart(1);
  } catch (error) {
    await s3
      .abortMultipartUpload({
        Bucket: bucketName,
        Key: objectName,
        UploadId: uploadId,
      })
      .promise();

    console.error(`Error: ${error.message}`);
  }
}

export async function uploadObject(folder, path, data) {
  const token = Cookies.get("accessToken");
  api
    .post(
      "/writeHistory",
      {
        subfolder_name: folder,
        filepath: path,
        data: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    )
    .then((response) => {
      console.log(response.data.detail);
    })
    .catch((error) => {
      console.error(error);
    });
}
