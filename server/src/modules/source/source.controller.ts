import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { sourceServices } from './services/source.services';

const createSource = tryCatch(async (req, res) => {
  const newSource = await sourceServices.creteSource(req.user, req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Source created successfully',
    data: newSource,
  });
});

const getSource = tryCatch(async (req, res) => {
  const sources = await sourceServices.getSource(req.user);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Sources Retrieved Successfully',
    data: sources,
  });
});

export const sourceController = { createSource, getSource };
