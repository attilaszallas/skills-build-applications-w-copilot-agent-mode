import { Router } from 'express';
import {
	ActivityModel,
	LeaderboardModel,
	TeamModel,
	UserModel,
	WorkoutModel,
} from '../models/index.js';

const apiRouter = Router();

apiRouter.get('/users/', async (_request, response) => {
	response.json(await UserModel.find().sort({ name: 1 }).lean());
});

apiRouter.get('/teams/', async (_request, response) => {
	response.json(await TeamModel.find().populate('memberIds', 'name username').sort({ name: 1 }).lean());
});

apiRouter.get('/activities/', async (_request, response) => {
	response.json(await ActivityModel.find().populate('userId', 'name username').sort({ startedAt: -1 }).lean());
});

apiRouter.get('/leaderboard/', async (_request, response) => {
	response.json(
		await LeaderboardModel.find()
			.populate('userId', 'name username')
			.sort({ period: -1, points: -1 })
			.lean(),
	);
});

apiRouter.get('/workouts/', async (_request, response) => {
	response.json(await WorkoutModel.find().sort({ title: 1 }).lean());
});

export default apiRouter;