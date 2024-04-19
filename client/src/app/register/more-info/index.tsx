import { colors } from '@/themes/colors';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Text, View } from 'react-native';

export default function MoreInfo() {
  return (
    <View style={{ backgroundColor: colors.bg.dark }} className="px-6 flex-1">
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="height" className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl font-bold text-primary-500 mb-8">
            Cash-IO
          </Text>
          <View style={{ gap: 16 }}>
            {/* <Input
              value={email.value}
              onValueChange={onEmailChange}
              placeholder="Email"
              keyboardType="email-address"
              error={email.error}
            />
            <Input
              value={password.value}
              onValueChange={onPasswordChange}
              placeholder="Password"
              secureTextEntry
              error={password.error}
            />
            <Input
              value={confirmPassword.value}
              onValueChange={onConfirmPasswordChange}
              placeholder="Password"
              secureTextEntry
              error={confirmPassword.error}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                onPress={handleRegister}
                customClass="mx-auto w-[160px] mt-5"
              >
                <Text className="text-xl font-bold text-white">Register</Text>
              </Button>
            )} */}
          </View>
          <View style={{ gap: 30 }} className="flex-row mt-8 items-center">
            <View
              style={{ height: 1, width: '100%' }}
              className="w-full bg-neutral-300"
            />
            <Text className="text-neutral-400">OR</Text>
            <View
              style={{ height: 1, width: '100%' }}
              className="bg-neutral-300"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
