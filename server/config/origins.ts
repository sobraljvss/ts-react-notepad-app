require('dotenv').config();
const PORT = process.env.CLIENT_PORT;

// allowed origins
export default [`http://localhost:${PORT}`];
