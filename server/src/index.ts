import * as dotenv from 'dotenv';

import app from './server';
import logger from './logger';

dotenv.config();
const port = process.env.PORT || (7777 as number);

app.listen(port, () => {
  logger.info(`listening on http://localhost:${port}`);
});
