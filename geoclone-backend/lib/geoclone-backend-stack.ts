import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";

export class GeocloneBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* ------------------------------------ Lambda ----------------------------------- */
    const highScoreLambda = new lambda.Function(
      this,
      "GeocloneHighScoreLambda",
      {
        functionName: "GeocloneHighScoreLambda",
        code: lambda.Code.fromAsset("lambda/HighScore", {
          exclude: ["*.ts", "*.d.ts"],
        }),
        handler: "main.handler",
        runtime: lambda.Runtime.NODEJS_18_X,
      }
    );

    /* ------------------------------------ API Gateway ----------------------------------- */
    const restApi = new apiGateway.RestApi(this, "GeocloneRestApi", {
      restApiName: "GeocloneAPI",
    });
    const resource = restApi.root.addResource("highscore");
    resource.addMethod(
      "GET",
      new apiGateway.LambdaIntegration(highScoreLambda)
    );

    /* ------------------------------------ DynamoDB ----------------------------------- */
    const highScoreTable = new dynamodb.Table(this, "GeocloneHighScoreTable", {
      tableName: "GeocloneHighScoreTable",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    /* ----------------------------------- IAM ---------------------------------- */
    highScoreTable.grantReadWriteData(highScoreLambda);
    highScoreLambda.addEnvironment("HIGHSCORE_TABLE", highScoreTable.tableName);
  }
}
