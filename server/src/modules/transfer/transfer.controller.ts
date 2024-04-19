import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { transferServices } from './services/transfer.services';

const createTransfer = tryCatch(async (req, res) => {
  const newTransfer = await transferServices.createTransfer(req.user, req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Transfer was successful',
    data: newTransfer,
  });
});

export const transferController = { createTransfer };
