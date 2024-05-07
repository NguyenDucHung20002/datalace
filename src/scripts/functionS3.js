import { s3 } from "./awsClient.js";
import Cookies from "js-cookie";
import axios from "axios";
var api = axios.create({
  // baseURL: 'http://localhost:8000',
  // baseURL: "https://datalace.org/api",
  //baseURL: "http://18.219.44.230",
  baseURL: process.env.REACT_APP_API,
});
export async function checkBucketExits(bucketName) {
  try {
    const token = Cookies.get("accessToken");
    const response = await api.post(
      "/checkExits",
      {
        folder: bucketName,
        path: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
    console.log(response.data.detail);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// export async function getObject(bucketName, objectName) {
//   try {
//     const data = await s3.getObject({
//       Bucket: bucketName,
//       Key: objectName,
//     }).promise();
//     return data
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }
export async function getObject(bucketName, objectName) {
  try {
    const token = Cookies.get("accessToken");
    const response = await api.post(
      "/getObject",
      {
        folder: bucketName,
        path: objectName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteS3Object(bucketName, objectKey) {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error("Error deleting object:", error);
  }
}

export async function deleteObject(folder, path) {
  try {
    const token = Cookies.get("accessToken");
    const response = await api.post(
      "/deleteObject",
      {
        folder: folder,
        path: path,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
    console.log(response.data.detail);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteS3Chart(bucketName, prefix) {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const objects = data.Contents;

    for (const object of objects) {
      const key = object.Key;
      await s3.deleteObject({ Bucket: bucketName, Key: key }).promise();
    }
  } catch (error) {
    console.error("Error deleting objects in prefix:", error);
  }
}

export async function getObjects(bucketName, objectKey) {
  // if (objectKey) {
  //   const params = {
  //     Bucket: bucketName,
  //     Prefix: objectKey,
  //   };

  //   try {
  //     const response = await s3.listObjectsV2(params).promise();
  //     const objects = response.Contents;

  //     const filteredObjects = objects.filter(object => !object.Key.includes("more") && !object.Key.includes("table.json"));

  //     const datas = await Promise.all(filteredObjects.map(async (object) => {
  //       const objectInfo = await getObject(bucketName, object.Key);
  //       return objectInfo;
  //     }));

  //     return datas;
  //   } catch (error) {
  //     console.error('Error object:', error);
  //   }
  // }
  try {
    const token = Cookies.get("accessToken");
    const response = await api.post(
      "/getListObject",
      {
        folder: bucketName,
        prefix: objectKey,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
    const objects = response.data.data;
    const value = objects.map((object, index) => {
      return Object.values(object)[0].Body;
    });
    return value;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getObjectsofMore(bucketName, objectKey) {
  if (objectKey) {
    const params = {
      Bucket: bucketName,
      Prefix: objectKey,
    };

    try {
      const response = await s3.listObjectsV2(params).promise();
      const objects = response.Contents;
      // console.log("ObjectMore",objects)
      const datas = await Promise.all(
        objects.map(async (object) => {
          const objectInfo = await getObject(bucketName, object.Key);
          return objectInfo;
        })
      );
      return datas;
    } catch (error) {
      console.error("Error object:", error);
    }
  }
}

export async function getNewHistory(bucketName, objectKey) {
  // if (objectKey) {
  //   const params = {
  //     Bucket: bucketName,
  //     Prefix: objectKey,
  //   };

  //   try {
  //     const response = await s3.listObjectsV2(params).promise();
  //     const objects = response.Contents;

  //     objects.sort((a, b) => b.Key.localeCompare(a.Key));

  //     const newestObject = objects[0];
  //     if (newestObject) {
  //       const objectInfo = await getObject(bucketName, newestObject.Key);
  //       Cookies.set('timeLogin', newestObject.Key.slice(newestObject.Key.lastIndexOf('/') + 1, newestObject.Key.lastIndexOf('.')))
  //       return objectInfo;
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error object:', error);
  //   }
  // }
  try {
    const token = Cookies.get("accessToken");
    const response = await api.post(
      "/getListObject",
      {
        folder: bucketName,
        prefix: objectKey,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
    const objects = response.data.data;
    objects.sort((a, b) => Object.keys(b)[0].localeCompare(Object.keys(a)[0]));
    const newestObject = objects[0];
    if (newestObject) {
      const key = Object.keys(newestObject)[0];
      Cookies.set(
        "timeLogin",
        key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."))
      );
      return newestObject[key];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getKeysObject(bucketName, objectKey) {
  // if (objectKey) {
  //   const params = {
  //     Bucket: bucketName,
  //     Prefix: objectKey,
  //   };

  //   try {
  //     const response = await s3.listObjectsV2(params).promise();
  //     const objects = response.Contents;
  //     const key = objects.map((object, index) => {
  //       return object.Key.slice(object.Key.lastIndexOf('/') + 1, object.Key.lastIndexOf('.'))
  //     })
  //     return key;
  //   } catch (error) {
  //     console.error('Error object:', error);
  //   }
  // }
  try {
    const token = Cookies.get("accessToken");
    const response = await api.post(
      "/getListObject",
      {
        folder: bucketName,
        prefix: objectKey,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
    const objects = response.data.data;

    const keys = objects.map((object, index) => {
      const keyObject = Object.keys(object)[0];
      return keyObject.slice(
        keyObject.lastIndexOf("/") + 1,
        keyObject.lastIndexOf(".")
      );
    });

    return keys;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNameTimeStamp(bucketName, objectKey) {
  // try {
  // const data = await s3.getObject({
  //   Bucket: bucketName,
  //   Key: objectKey,
  // }).promise();
  // const jsonData = JSON.parse(data.Body);
  // return jsonData.filename
  // } catch (error) {
  //   console.error(error)
  //   return null
  // }
  try {
    const token = Cookies.get("accessToken");
    const response = await api.post(
      "/getObject",
      {
        folder: bucketName,
        path: objectKey,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
    return JSON.parse(response.data.Body).filename;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// export async function deleteS3Bucket(bucketName) {
//     const params = {
//         Bucket: bucketName,
//     };

//     try {
//         const objects = await s3.listObjectsV2(params).promise()
//         await s3.deleteBucket(params).promise();
//         console.log(`Bucket ${bucketName} deleted successfully.`);
//         if (objects.Contents.length > 0) {
//             // Delete all objects in the bucket
//             const deleteObjectsParams = {
//                 Bucket: bucketName,
//                 Delete: { Objects: objects.Contents.map((obj) => ({ Key: obj.Key })) },
//             };

//             await s3.deleteObjects(deleteObjectsParams).promise();

//             objects.Contents.forEach((obj) => {
//                 console.log(`Deleted object: ${obj.Key}`);
//             });
//         }
//         await s3.deleteBucket({ Bucket: bucketName }).promise();
//         console.log(`Bucket ${bucketName} and all its keys deleted successfully.`);
//     } catch (error) {
//         console.error(`Error deleting bucket and keys: ${error.message}`);
//     }
// }

export async function checkObjectExits(bucketName, objectKey) {
  try {
    const token = Cookies.get("accessToken");
    const response = await api.post(
      "/checkExits",
      {
        folder: bucketName,
        path: objectKey,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
    console.log(response.data.detail);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
