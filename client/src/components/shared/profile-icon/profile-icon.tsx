import { Image, Text, View, ViewBase } from 'react-native';

type ProfileIconProps = {
  name: string;
  imageUrl: string;
};

export function ProfileIcon({ name, imageUrl }: ProfileIconProps) {
  return (
    <View className="flex-row items-center bg-card-bg-dark rounded-full p-2 pr-4">
      <View className="h-8 w-8 items-center justify-center bg-white rounded-full">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} />
        ) : (
          <View>
            <Text className="text-2xl font-bold text-bg-dark">{name[0]}</Text>
          </View>
        )}
      </View>
      <Text className="ml-4 text-white text-base font-medium">{name}</Text>
    </View>
  );
}
