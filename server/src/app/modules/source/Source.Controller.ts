import { SendSuccessResponse } from '../../utils/ResponseHelper';
import { TryCatch } from '../../utils/TryCatch';
import { SourceServices } from './Source.Services';

const CreateSource = TryCatch(async (req, res) => {
  const newSource = await SourceServices.CreateSource(req.user, req.body);

  SendSuccessResponse(res, {
    data: newSource,
    message: 'Source Created Successfully',
    status: 200,
  });
});

export const SourceController = { CreateSource };
