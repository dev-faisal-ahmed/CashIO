import { TIcon } from '@/components/shared/icon/icon-helper';
import { useInput } from '@/hooks/use-input';
import { useSourceDetailsServices } from '@/store/use-source-details-services';
import { useSourceServices } from '@/store/use-source-services';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { toast } from '@/utils/helpers/toast.helper';
import { TEditSourcePayload } from '@/utils/types/server.types';
import { useState } from 'react';

type TUseEditSource = {
  previousName: string;
  previousBudget: number;
  icon: TIcon;
  onCloseModal: () => void;
  sourceId: string;
};

export const useEditSource = ({
  previousName,
  previousBudget,
  icon,
  onCloseModal,
  sourceId,
}: TUseEditSource) => {
  const [selectedIcon, setSelectedIcon] = useState(icon);
  const [name, onNameChange, setNameError] = useInput(previousName);
  const [budget, onBudgetChange, setBudgetError] = useInput(
    String(previousBudget)
  );
  const [loading, setLoading] = useState(false);
  const { refetch: sourceDetailsRefetch } = useSourceDetailsServices();
  const { refetch: sourcesRefetch } = useSourceServices();

  const onIconUpdate = (icon: TIcon) => setSelectedIcon(icon);

  const onEditSource = async () => {
    setNameError('');
    setBudgetError('');
    const numberRegex = /^-?\d*\.?\d+$/;
    if (!name.value) return setNameError('Name is required');
    if (budget && !numberRegex.test(budget.value))
      return setBudgetError('Invalid Number');
    if (!selectedIcon) return toast.error('Icon Is Required');

    try {
      setLoading(true);
      const response = await fetchHelper<any, TEditSourcePayload>({
        url: `source/${sourceId}`,
        method: 'PATCH',
        body: {
          name: name.value,
          icon: selectedIcon!,
          budget: Number(budget.value),
        },
      });

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      sourceDetailsRefetch(sourceId);
      sourcesRefetch();
      onCloseModal();
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    form: {
      fields: { name, budget },
      handlers: { onNameChange, onBudgetChange },
    },
    states: { selectedIcon, loading },
    handlers: { onIconUpdate, onEditSource },
  };
};
