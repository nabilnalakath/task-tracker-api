

import { Request, Response } from 'express';
import sequelize from '../config/database.config';
import { Op } from 'sequelize';

// Local imports
import { getTaskMetricsQuery } from '../database/queries';
import { responseTransformer } from '../middleware/responseMiddleware';
import { formatMonth } from '../utils/utils';
import { SUCCESS, FAILURE } from '../utils/constants';



// Define a common query for calculating task metrics
const commonMetricsQuery: any = {
    attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalTasks'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'open' THEN 1 ELSE 0 END")), 'openTasks'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'inprogress' THEN 1 ELSE 0 END")), 'inprogressTasks'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'completed' THEN 1 ELSE 0 END")), 'completedTasks'],
    ],
    raw: true,
};


export const getAllTaskMetrics = async (req: Request, res: Response) => {
    try {
        const metricsQuery = { ...commonMetricsQuery };
        const metrics: any = await getTaskMetricsQuery(metricsQuery);
        if (!metrics || metrics.length === 0 || metrics[0].totalTasks === "0") {
            return res.status(400).json(responseTransformer(FAILURE, {
                error: 'No task metrics found'
            }));

        }
        return res.status(200).json(responseTransformer(SUCCESS, metrics[0]))

    } catch (error) {
        return res.status(500).json(responseTransformer(FAILURE, {
            error: 'Error fetching all task metrics'
        }));
    }
};

export const getTaskMetricsByMonth = async (req: Request, res: Response) => {
    try {

        const { month } = req.params;
        const validDate = new Date(month);
        console.log('month', month);
        if (isNaN(validDate.getTime())) {
            return res.status(400).json(responseTransformer(FAILURE, {
                error: 'Invalid month format'
            }));
        }


        const year = validDate.getFullYear();
        const monthIndex = validDate.getMonth();
        const firstDay = new Date(year, monthIndex, 1);
        const lastDay = new Date(year, monthIndex + 1, 0);

        const metricsQuery = {
            ...commonMetricsQuery,
            where: {
                created_at: {
                    [Op.between]: [firstDay, lastDay],
                },
            },
        };

        const metrics: any = await getTaskMetricsQuery(metricsQuery);
        console.log(metrics);
        if (!metrics || metrics.length === 0 || metrics[0].totalTasks === "0") {
            return res.status(404).json(responseTransformer(FAILURE, {
                error: `No metrics found for the specified month ${month}`
            }));
        }

        const formattedMonth = formatMonth(month);

        return res.status(200).json(responseTransformer(SUCCESS, {
            month: formattedMonth,
            metrics: metrics[0]
        }));
    } catch (error) {
        return res.status(500).json(responseTransformer(FAILURE, {
            error: `Error fetching task metrics for month: ${req.params.month}`
        }));
    }
};

export const getTaskMetricsGroupedByMonth = async (req: Request, res: Response) => {
    try {
        const metricsQuery = {
            ...commonMetricsQuery,
            group: [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('created_at'))],
            attributes: [
                [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('created_at')), 'month'],
                ...commonMetricsQuery.attributes,
            ],
        };
        const metrics = await getTaskMetricsQuery(metricsQuery);
        console.log(metrics);
        if (!metrics || metrics.length === 0) {
            return res.status(404).json(responseTransformer(FAILURE, {
                error: 'No metrics found'
            }));
        }

        const formattedMetrics = metrics.map((metric: any) => ({
            month: formatMonth(metric.month),
            metrics: {
                totalTasks: metric.totalTasks,
                openTasks: metric.openTasks,
                inprogressTasks: metric.inprogressTasks,
                completedTasks: metric.completedTasks
            }
        }));

        return res.status(200).json(responseTransformer(SUCCESS, formattedMetrics));

    } catch (error) {
        return res.status(500).json(responseTransformer(FAILURE, {
            error: `Error fetching grouped task metrics`
        }));
    }
};
