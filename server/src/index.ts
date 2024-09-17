import * as dotenv from 'dotenv';

import app from './server';
import logger from './logger';
import {createDefaultAdmin} from "./handlers/admin";

dotenv.config();
const port = process.env.PORT || (7777 as number);

(async (): Promise<void> => {
  try {
    await createDefaultAdmin()
  } catch (err) {
    logger.error(`Error creating admin: ${err.message}`)
  }
})()

app.listen(port, () => {
  logger.info(`listening on http://localhost:${port}`);
});
