import axios from 'axios';

// connection to server
export default axios.create({ baseURL: `http://localhost:${import.meta.env.VITE_SERVER_PORT}` });
