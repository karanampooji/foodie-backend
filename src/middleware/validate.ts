import { NextFunction, Request, Response } from "express";
import { InferType } from "yup";
import {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
  joinSchema,
  searchRecipeSchema,
} from "../schema-validations";

//middleware to validate req data
export const validate =
  (
    schema: InferType<
      | typeof createRecipeSchema
      | typeof getRecipeSchema
      | typeof getUserRecipesSchema
      | typeof joinSchema
      | typeof searchRecipeSchema
    >
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        ...(req?.body && { body: req.body }),
        ...(req?.query && { query: req.query }),
        ...(req?.params && { params: req.params }),
      });
      return next();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
