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

const getSources = tryCatch(async (req, res) => {
  const sources = await sourceServices.getSources(req.user);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Sources Retrieved Successfully',
    data: sources,
  });
});

const getSource = tryCatch(async (req, res) => {
  const { sourceId } = req.params;
  const source = await sourceServices.getSource(sourceId);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Source Retrieved Successfully',
    data: source,
  });
});

export const sourceController = { createSource, getSources, getSource };
