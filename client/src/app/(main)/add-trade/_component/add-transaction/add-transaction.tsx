import { Text, View } from 'react-native';
import { useAddTransaction } from './use-add-transaction';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { WalletsPicker } from './walletsPicker';
import { SourcePicker } from './source-picker';

type AddTransactionProps = { tardeType: 'EXPENSE' | 'INCOME'; amount: string };

export function AddTransaction({ tardeType, amount }: AddTransactionProps) {
  const {
    states: {
      sources,
      wallets,
      sourceLoading,
      walletLoading,
      selectedSource,
      selectedWallet,
      showSources,
      showWallets,
    },
    handlers: {
      onSourceUpdate,
      setShowSources,
      onWalletUpdate,
      setShowWallets,
    },
  } = useAddTransaction({ amount, tardeType });

  if (sourceLoading || walletLoading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <>
      <View>
        <SourcePicker
          sources={sources}
          onSourceUpdate={onSourceUpdate}
          selectedSource={selectedSource}
          setShowSources={setShowSources}
          showSources={showSources}
        />
        <WalletsPicker
          wallets={wallets}
          onWalletUpdate={onWalletUpdate}
          selectedWallet={selectedWallet}
          setShowWallets={setShowWallets}
          showWallets={showWallets}
        />
        <Button customClass="mt-6">
          <Text className="text-white">Add Transaction</Text>
        </Button>
      </View>
    </>
  );
}
