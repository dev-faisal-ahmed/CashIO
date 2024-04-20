import { GoogleLogin } from '@/components/shared/google-login/google.login';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { useLogin } from './_hooks/use-login';
import { Input } from '@/components/shared/input/input';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { Link } from 'expo-router';

export default function Login() {
  const { states, handlers } = useLogin();
  const { email, password, loading } = states;
  const { handleLogin, onEmailChange, onPasswordChange } = handlers;

  return (
    <View className="px-6 flex-1 bg-bg-dark">
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="height" className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl font-bold text-primary-500 mb-8">
            Cash-IO
          </Text>
          <View style={{ gap: 16 }}>
            <Input
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

            {loading ? (
              <Loader />
            ) : (
              <Button
                onPress={handleLogin}
                customClass="mx-auto w-[160px] mt-5"
              >
                <Text className="text-xl font-bold text-white">Register</Text>
              </Button>
            )}
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
          href={'/register'}
        >
          New Here? Create an account
        </Link>
      </KeyboardAvoidingView>
    </View>
  );
}
