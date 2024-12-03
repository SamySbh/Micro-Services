import express from 'express';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.GATEWAY_PORT;

app.use(express.json());

app.use(
    '/api/auth',
    proxy(process.env.AUTH_SERVICE_URL)
);

app.listen(PORT, () => console.log(`API Gateway running on http://localhost:${PORT}`));
