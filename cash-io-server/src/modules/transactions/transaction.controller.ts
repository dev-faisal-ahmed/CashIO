import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { transactionServices } from './services/transaction.services';

const createTransaction = tryCatch(async (req, res) => {
  const newTransaction = await transactionServices.createTransaction(
    req.user,
    req.body
  );

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Transaction Added Successfully',
    data: newTransaction,
  });
});

export const transactionController = { createTransaction };
