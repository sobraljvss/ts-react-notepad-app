import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';

type MiddlewareType = (req: Request, res: Response, next: NextFunction) => void;

export const emitLog: MiddlewareType = (req: Request, res: Response, next: NextFunction): void => {
	const log = `${format(new Date(), 'yyyy/MM/dd hh:mm:ss')}\t${req.method}\t${req.url}\n`;

	console.log(log);

	if (!fs.existsSync(path.join(path.dirname('logs'), 'logs'))) fsPromises.mkdir('logs');

	try {
		fs.appendFileSync(path.join(path.dirname('logs'), 'logs', 'logs.txt'), log, 'utf-8');
		next();
	} catch (err: any) {
		console.error(err);
	}
};
