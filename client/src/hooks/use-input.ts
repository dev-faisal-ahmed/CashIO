import { useState } from 'react';

export const useInput = () => {
  const [input, setInput] = useState<string>('');
  const onChange = (val: string) => {
    setInput(val);
  };

  return [input, onChange] as const;
};
