import { GoogleLogin } from '@/components/shared/google-login/google.login';
import { Input } from '@/components/shared/input/input';
import { Button } from '@/components/ui/button';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Text, View } from 'react-native';

export default function Register() {
  return (
    <SafeAreaView className="px-5 pt-2 flex-1 bg-white">
      <KeyboardAvoidingView className="items-center justify-center flex-1">
        <Text className="text-4xl font-bold text-primary-500 mb-8">
          Cash-IO
        </Text>
        <View style={{ gap: 20 }}>
          <Input placeholder="Email" keyboardType="email-address" />
          <Input placeholder="Password" secureTextEntry />
          <Button customClass="mx-auto w-[160px] mt-5">
            <Text className="text-xl font-bold text-white">Login</Text>
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
      </KeyboardAvoidingView>
      <Link
        className="mb-8  text-center text-base text-primary-600 font-bold"
        href={'/login'}
      >
        Have an Account? LOGIN
      </Link>
    </SafeAreaView>
  );
}
