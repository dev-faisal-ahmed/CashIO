import { GoogleLogin } from '@/components/shared/google-login/google.login';
import { Input } from '@/components/shared/input/input';
import { Button } from '@/components/ui/button';
import { colors } from '@/themes/colors';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { useRegister } from './_hooks/use-register';

export default function Register() {
  const { states, handlers } = useRegister();
  const { email, password, confirmPassword } = states;

  const {
    onConfirmPasswordChange,
    onEmailChange,
    onPasswordChange,
    handleRegister,
  } = handlers;

  return (
    <View style={{ backgroundColor: colors.bg.dark }} className="px-6 flex-1">
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="height" className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl font-bold text-primary-500 mb-8">
            Cash-IO
          </Text>
          <View style={{ gap: 16 }}>
            <Input
              value={email}
              onValueChange={onEmailChange}
              placeholder="Email"
              keyboardType="email-address"
            />
            <Input
              value={password}
              onValueChange={onPasswordChange}
              placeholder="Password"
              secureTextEntry
            />
            <Input
              value={confirmPassword}
              onValueChange={onConfirmPasswordChange}
              placeholder="Password"
              secureTextEntry
            />
            <Button
              onPress={handleRegister}
              customClass="mx-auto w-[160px] mt-5"
            >
              <Text className="text-xl font-bold text-white">Register</Text>
            </Button>
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
          <GoogleLogin />
        </View>

        <Link
          className="mb-8  text-center text-base text-primary-300 font-bold"
          href={'/login'}
        >
          Have an Account? LOGIN
        </Link>
      </KeyboardAvoidingView>
    </View>
  );
}
