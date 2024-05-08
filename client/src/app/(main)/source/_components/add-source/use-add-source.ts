import { TIcon } from '@/components/shared/icon/icon-helper';
import { useInput } from '@/hooks/use-input';
import { useSourceServices } from '@/store/use-source-services';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { toast } from '@/utils/helpers/toast.helper';
import { TSourceType } from '@/utils/types/data.types';
import { TAddSourcePayload } from '@/utils/types/server.types';
import { useState } from 'react';

type TUseAddSource = {
  onCloseModal: () => void;
};

export const useAddSource = ({ onCloseModal }: TUseAddSource) => {
  const [name, onNameChange, setNameError] = useInput();
  const [budget, onBudgetChange, setBudgetError] = useInput();
  const [icon, setIcon] = useState<TIcon>();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<TSourceType>('EXPENSE');
  const { refetch } = useSourceServices();

  const updateIcon = (payload: TIcon) => {
    setIcon(payload);
  };

  const onAddSource = async () => {
    setNameError('');
    setBudgetError('');
    // validation
    if (!name.value) return setNameError('Name is required');
    const numberRegex = /^-?\d*\.?\d+$/;
    if (budget.value && !numberRegex.test(budget.value))
      return setBudgetError('Invalid Budget Balance');

    try {
      setLoading(true);
      if (!icon) throw new Error('Please Select An Icon');
      const payload: TAddSourcePayload = { name: name.value, icon: icon, type };
      if (budget) payload.budget = Number(budget.value);

      const response = await fetchHelper<any, TAddSourcePayload>({
        url: 'source',
        method: 'POST',
        body: payload,
      });

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      refetch();
      onCloseModal();
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    states: { name, icon, budget, loading, type },
    handlers: {
      onNameChange,
      updateIcon,
      onBudgetChange,
      setType,
      onAddSource,
    },
  };
};
