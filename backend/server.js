import { PORT } from './src/config/index.js';
import connectDB from './src/database/index.js';
import { createServer } from "http";
import app from './src/app.js';

connectDB();

const serveurHTTP = createServer(app)

serveurHTTP.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})