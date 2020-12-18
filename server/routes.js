import homeRouter from './api/controllers/home/router';
import personRouter from "./api/controllers/person/router";
import authRouter from "./api/controllers/auth/router";
import feeRouter from "./api/controllers/fee/router";
import awardRouter from "./api/controllers/award/router"
export default function routes(app) {
  app.use('/api/home', homeRouter);
  app.use('/api/person',personRouter);
  app.use('/api/auth',authRouter);
  app.use('/api/fee',feeRouter);
  app.use('/api/award',awardRouter);
}
