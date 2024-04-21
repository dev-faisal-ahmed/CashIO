export type TServerResponse<TData> = {
  status: number;
  message: string;
  ok: boolean;
  data?: TData;
  error?: any;
};

export type TRegisterPayload = {
  email: string;
};

export type TUpdateProfilePayload = {
  name: string;
  currency: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};