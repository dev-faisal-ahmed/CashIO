import { Text, View } from 'react-native';
import { useAddTransaction } from './use-add-transaction';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { WalletsPicker } from './wallets-picker';
import { SourcePicker } from './source-picker';

export function AddTransaction() {
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
      apiLoading,
    },
    handlers: {
      onSourceUpdate,
      setShowSources,
      onWalletUpdate,
      setShowWallets,
      onAddTransaction,
    },
  } = useAddTransaction();

  if (sourceLoading || walletLoading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <>
      <View>
        {sources.length && selectedSource ? (
          <SourcePicker
            sources={sources}
            onSourceUpdate={onSourceUpdate}
            selectedSource={selectedSource}
            setShowSources={setShowSources}
            showSources={showSources}
          />
        ) : (
          <>
            {!sourceLoading && (
              <Text className="text-white font-bold text-center">
                No Source Found, Please Add A Source First
              </Text>
            )}
          </>
        )}

        {wallets.length && selectedWallet ? (
          <WalletsPicker
            wallets={wallets}
            onWalletUpdate={onWalletUpdate}
            selectedWallet={selectedWallet}
            setShowWallets={setShowWallets}
            showWallets={showWallets}
          />
        ) : (
          <>
            {!walletLoading && (
              <Text className="text-white font-bold text-center">
                No Wallets Found, Please Add A Wallet First
              </Text>
            )}
          </>
        )}

        <View className="mt-6">
          {apiLoading ? (
            <Loader />
          ) : (
            <Button onPress={onAddTransaction}>
              <Text className="text-white">Add Transaction</Text>
            </Button>
          )}
        </View>
      </View>
    </>
  );
}
