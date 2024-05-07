import { dynamodb } from "./awsClient.js";

export async function getItem(tableName, paramKey) {
  const param = {
    TableName: tableName,
    Key: paramKey,
  };
  // console.log(param)
  try {
    const data = await dynamodb.getItem(param).promise();
    return data.Item;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function deleteItem(tableName, paramKey) {
  const params = {
    TableName: tableName,
    Key: paramKey,
    ReturnValues: "ALL_OLD" 
  };

  try {
    const data = await dynamodb.deleteItem(params).promise();
    // console.log("Item deleted successfully", data.Attributes)
    return data.Attributes;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
