import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';

type MiddlewareType = (req: Request, res: Response, next: NextFunction) => void;

// write a file containing informations about every request
export const emitLog: MiddlewareType = (req: Request, res: Response, next: NextFunction): void => {
	// the request informations
	const log = `${format(new Date(), 'yyyy/MM/dd hh:mm:ss')}\t${req.method}\t${req.url}\n`;

	// create a folder called logs, if it does not exists
	if (!fs.existsSync(path.join(path.dirname('logs'), 'logs'))) fsPromises.mkdir('logs');

	try {
		// append new log to logs.txt
		fs.appendFileSync(path.join(path.dirname('logs'), 'logs', 'logs.txt'), log, 'utf-8');
		next();
	} catch (err: any) {
		console.error(err);
	}
};
