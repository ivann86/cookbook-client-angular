import express from 'express';
import { api } from '../cookbook-server/src/api';
import { configMongoose } from '../cookbook-server/src/database/config';
import { createUsersCollection } from '../cookbook-server/src/users';
import { createInvalidTokensStore, createRecipeStore, createUserStore } from '../cookbook-server/src/database';
import { createRecipesCollection } from '../cookbook-server/src/recipe';
import cors from 'cors';
import helmet from 'helmet';

const users = createUsersCollection(createUserStore());
const recipes = createRecipesCollection(createRecipeStore());
const invalidTokens = createInvalidTokensStore();
const apiOtions = { jwtSecret: 'hf944s9ssaq', jwtExpiresIn: 3600 };
const cookbookApi = api(users, recipes, invalidTokens, apiOtions);

export const dbConnect = configMongoose(process.env['MONGODB_CONNECTION_STRING']!, { serverSelectionTimeoutMS: 5000 });
export const app = express();
app.enable('trust proxy');
// CORS
app.use(cors({ origin: [/\.ivanoff\.dev$/, /cookbook-ng\.ml$/] }));
// Helmet ()
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use('v1/', cookbookApi);
