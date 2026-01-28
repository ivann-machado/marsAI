const config = require('./src/config');
// const connectDB = require('./src/database');
const http = require("http");
const app = require('./src/app');

// connectDB();

const serveurHTTP = http.createServer(app)

serveurHTTP.listen(config.PORT, () => {
	console.log(`Server started on http://localhost:${config.PORT}`)
})