import { exit } from "process";

const DynamoDB = require("aws-sdk/clients/dynamodb");
const docClient = new DynamoDB.DocumentClient();

type HighScore = {
  id: string;
  player: string;
  score: number;
  timestamp: string;
};

export const getAllItems = async (tableName: string) => {
  try {
    const params = {
      TableName: tableName,
    };
    const data = await docClient.scan(params).promise();

    return data.Items as HighScore[];
  } catch (err) {
    console.log("DynamoDB error: ", err);
    exit();
  }
};

const response = (statusCode: number, values: object) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(values),
  };
};

exports.handler = async function (event: any, context: any) {
  try {
    var method = event.httpMethod;

    if (method === "GET") {
      const tableName = process.env.HIGHSCORE_TABLE;
      if (!tableName)
        throw new Error("HIGHSCORE_TABLE environment variable not found!");

      const highScores = await getAllItems(tableName);
      const topTen = highScores
        .sort((a, b) => (a.score > b.score ? -1 : 1))
        .slice(0, 10);
      let body = {
        highScores: topTen,
      };
      return response(200, body);
    }

    // We only accept GET for now
    return response(400, { error: "We only accept GET /" });
  } catch (error: any) {
    let err = error.stack || JSON.stringify(error, null, 2);
    return response(400, err);
  }
};
