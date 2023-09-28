// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateTaskCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    status: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateTaskUpdate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
