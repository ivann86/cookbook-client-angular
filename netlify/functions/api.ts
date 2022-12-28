import { HandlerEvent, HandlerContext } from '@netlify/functions';
import { app, dbConnect } from '../config';
import serverless from 'serverless-http';

let dbConn: null | Promise<any> = null;

const handler = async (event: HandlerEvent, context: HandlerContext) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    if (!dbConn) {
      dbConn = dbConnect;
      await dbConn;
    }
    const serverlessHadler = serverless(app, { basePath: '/.netlify/functions/api/' });
    const result = await serverlessHadler(event, context);
    return result;
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An unknown error occured.' }),
    };
  }
};

export { handler };
