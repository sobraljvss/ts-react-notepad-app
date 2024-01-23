import { CorsOptions } from 'cors';
import origins from './origins';

export const corsOptions: CorsOptions = {
	origin(requestOrigin, callback) {
		if (!requestOrigin || !origins.includes(requestOrigin)) {
			callback(new Error('Not allowed by CORS'));
		} else callback(null, requestOrigin);
	},
};
