import { WalletSelector } from '../transfer/wallet-selector';
import { useAddTransaction } from './use-add-transaction';
import { SourceSelect } from './source-select';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { Text, View } from 'react-native';

export function AddTransaction() {
  const {
    states: {
      sources,
      wallets,
      sourceLoading,
      walletLoading,
      selectedSource,
      selectedWallet,
      apiLoading,
    },
    handlers: { onSourceUpdate, onWalletUpdate, onAddTransaction },
  } = useAddTransaction();

  if (sourceLoading || walletLoading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <>
      <View style={{ gap: 16 }} className="flex-row">
        <SourceSelect
          title="Source"
          selectedSource={selectedSource}
          onSourceChange={onSourceUpdate}
          sources={sources}
        />

        <WalletSelector
          title="Wallet"
          onWalletChange={onWalletUpdate}
          selectedWallet={selectedWallet}
          wallets={wallets}
        />
      </View>

      <View className="mt-8">
        {apiLoading ? (
          <Loader />
        ) : (
          <Button onPress={onAddTransaction}>
            <Text className="text-white text-base font-bold">
              Add Transaction
            </Text>
          </Button>
        )}
      </View>
    </>
  );
}
