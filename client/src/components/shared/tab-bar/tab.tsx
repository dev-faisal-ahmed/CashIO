import { colors } from '@/themes/colors';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TabProps = {
  icon: ReactNode;
  title: string;
  url: string;
  activeUrl: string;
};

export function Tab({ title, icon, url, activeUrl }: TabProps) {
  return (
    <TouchableWithoutFeedback onPress={() => router.push(url)}>
      <View className="items-center">
        <View
          style={{
            backgroundColor:
              url === activeUrl ? colors.card.bg.dark : 'transparent',
          }}
          className={'rounded-3xl px-2 py-1 w-full'}
        >
          {icon}
        </View>
        <Text
          className={twMerge(
            'font-bold',
            activeUrl === url ? 'text-primary-500' : 'text-white'
          )}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
