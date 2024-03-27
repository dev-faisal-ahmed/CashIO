import { ErrorRequestHandler } from 'express';
import { SendErrorResponse } from '../utils/ResponseHelper';

export const GlobalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let status: number = err.status || 500;
  let message: string = err.message || 'something went wrong';

  return SendErrorResponse(res, { message, status, error: err });
};
