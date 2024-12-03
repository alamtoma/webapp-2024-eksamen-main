
import app from "../app";
import { config } from './config/config';


const startServer = async () => {
  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
};

startServer();
