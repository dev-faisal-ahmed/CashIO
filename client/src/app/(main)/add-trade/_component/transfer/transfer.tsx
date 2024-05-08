import { Text, View } from 'react-native';
import { useTransfer } from './use-transfer';
import { WalletSelector } from './wallet-selector';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/shared/input/input';

export function Transfer() {
  const {
    states: {
      loading,
      selectedFromWallet,
      selectedToWallet,
      wallets,
      toWalletList,
      fee,
      apiLoading,
    },
    handlers: { onFromWalletChange, onToWalletChange, onFeeChange, onTransfer },
  } = useTransfer();

  if (loading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <>
      <View style={{ gap: 16 }} className="flex-row mb-6">
        <WalletSelector
          title="From Wallet"
          selectedWallet={selectedFromWallet}
          wallets={wallets}
          onWalletChange={onFromWalletChange}
        />
        <WalletSelector
          title="To Wallet"
          selectedWallet={selectedToWallet}
          wallets={toWalletList}
          onWalletChange={onToWalletChange}
          disable={!selectedFromWallet}
        />
      </View>

      <Input
        value={fee.value}
        onValueChange={onFeeChange}
        placeholder="Fees"
        error={fee.error}
        keyboardType="decimal-pad"
      />

      <View className="mt-8">
        {apiLoading ? (
          <Loader />
        ) : (
          <Button onPress={onTransfer} customClass="rounded-xl">
            <Text className="text-white font-bold text-lg">Proceed</Text>
          </Button>
        )}
      </View>
    </>
  );
}
