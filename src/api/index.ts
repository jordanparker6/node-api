import { Router } from 'express';
import cloudCompare from './routes/cloudCompare';

export default () => {
	const app = Router();
	cloudCompare(app);

	return app
}