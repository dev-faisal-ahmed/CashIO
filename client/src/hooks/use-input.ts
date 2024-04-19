import { useState } from 'react';

export const useInput = () => {
  const [input, setInput] = useState({ value: '', error: '' });

  const onChange = (val: string) => {
    setInput((prev) => ({ ...prev, value: val }));
  };

  const setError = (msg: string) => {
    setInput((prev) => ({ ...prev, error: msg }));
  };
  return [input, onChange, setError] as const;
};
