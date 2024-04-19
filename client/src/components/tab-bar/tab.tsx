import { Link, router } from 'expo-router';
import { ReactNode } from 'react';
import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TabProps = {
  icon: ReactNode;
  title: string;
  url: string;
  activeUrl: string;
};

export function Tab({ title, icon, url, activeUrl }: TabProps) {
  return (
    <TouchableOpacity onPress={() => router.push(url)}>
      <View className="items-center">
        <View
          className={twMerge(
            'rounded-xl p-2 w-full',
            activeUrl === url ? 'bg-primary-100' : 'bg-transparent'
          )}
        >
          {icon}
        </View>
        <Text
          className={twMerge(
            'font-bold',
            activeUrl === url ? 'text-primary-500' : ''
          )}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
