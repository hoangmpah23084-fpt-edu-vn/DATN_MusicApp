import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const ConnectDB = () => {
  mongoose
    .connect(process.env.URI_MONGODB)
    .then(() => {
      console.log('Connect to DB');
    })
    .catch(() => {
      console.log('Connect error');
    });
};
