
import { Request, Response } from 'express';

// Local imports
import Task from '../models/Task';
import { responseTransformer } from '../middleware/responseMiddleware';
import { FAILURE, SUCCESS } from '../utils/constants';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.create({ title, description, status });
        return res.status(201).json(responseTransformer(SUCCESS, task))
    } catch (error) {
        console.error(error);
        return res.status(500).json(responseTransformer(FAILURE, {
            error: 'Error creating task'
        }));

    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.taskId, 10);
        const { status } = req.body;

        // Find the task by ID and lock it to prevent concurrent updates
        const task = await Task.findByPk(taskId, { lock: true });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.status = status;

        await task.save();
        return res.status(200).json(responseTransformer(SUCCESS, task))
    } catch (error) {
        return res.status(500).json(responseTransformer(FAILURE, {
            error: 'Error updating task'
        }));
    }
};



export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const parsedPage = parseInt(page as string, 10);
        const parsedLimit = parseInt(limit as string, 10);

        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
            return res.status(400).json({ error: 'Invalid pagination parameters' });
        }

        const offset = (parsedPage - 1) * parsedLimit;

        const tasks = await Task.findAndCountAll({
            offset,
            limit: parsedLimit,
        });

        if (!tasks || tasks.count === 0) {
            console.log(tasks)
            return res.status(200).json(responseTransformer(FAILURE, {
                message: "There are no tasks. Please create a new one"
            }))
        }


        return res.status(200).json(responseTransformer(SUCCESS, {
            totalTasks: tasks.count,
            currentPage: parsedPage,
            tasks: tasks.rows,
        }))
    } catch (error) {
        return res.status(500).json(responseTransformer(FAILURE, {
            error: 'Error fetching tasks'
        }));

    }
};
