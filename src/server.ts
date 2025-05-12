import 'dotenv/config';
import app from './app';
import { connectionDb } from './utils/db';
const PORT = process.env.PORT;


app.listen(PORT, () => {
  connectionDb();
  console.log(`Server is running on port ${PORT}`);
});
