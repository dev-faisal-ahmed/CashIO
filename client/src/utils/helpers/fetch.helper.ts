import { SERVER_ADDRESS } from '../config';
import { TServerResponse } from '../types/server.types';
import { getToken } from './token.helper';

type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type TFetchHelper<TBody> = {
  url: string;
  method?: TMethod;
  body?: TBody;
};

export const fetchHelper = async <TData, TRequest>({
  url,
  method = 'GET',
  body,
}: TFetchHelper<TRequest>) => {
  const token = await getToken();

  console.log(`${SERVER_ADDRESS}/api/${url}`);
  const response = await fetch(`${SERVER_ADDRESS}/api/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token as string,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data as TServerResponse<TData>;
};
