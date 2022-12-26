import { HandlerEvent, HandlerContext } from '@netlify/functions';
import { app, dbConnect } from '../config';
import * as serverless from 'serverless-http';

const handler = async (event: HandlerEvent, context: HandlerContext) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await dbConnect;
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
