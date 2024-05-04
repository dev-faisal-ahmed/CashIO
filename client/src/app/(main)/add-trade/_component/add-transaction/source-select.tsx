import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CloseModal } from '@/components/ui/close-modal';
import { getIcon } from '@/components/shared/icon/icon-helper';
import { useState } from 'react';
import { TSource } from '@/utils/types/data.types';
import { twMerge } from 'tailwind-merge';

type SourceSelectPops = {
  title: string;
  selectedSource: TSource | undefined;
  sources: TSource[];
  onSourceChange: (source: TSource) => void;
};

export function SourceSelect({
  title,
  selectedSource,
  sources,
  onSourceChange,
}: SourceSelectPops) {
  const [showSource, setShowSource] = useState(false);

  const updateSource = (source: TSource) => {
    onSourceChange(source);
    setShowSource(false);
  };

  return (
    <>
      <View className="flex-1">
        <View className="flex-row gap-3 items-center mb-4">
          <MaterialIcons name="category" size={24} color="white" />
          <Text className="text-white text-base">{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowSource(true)}
          className={twMerge('bg-card-bg-dark p-4 rounded-xl')}
        >
          {selectedSource ? (
            <View
              style={{ gap: 10 }}
              className="items-center flex-row justify-center"
            >
              {
                getIcon({ name: selectedSource.icon.name, size: 18 })[
                  selectedSource.icon.group
                ]
              }
              <Text numberOfLines={1} className="text-white font-bold">
                {selectedSource.name}
              </Text>
            </View>
          ) : (
            <Text
              numberOfLines={1}
              className="text-white text-center font-bold"
            >
              Select Any Source
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* modal */}
      <Modal animationType="slide" visible={showSource}>
        <View className="flex-1 bg-bg-dark px-6 py-3">
          <CloseModal onCloseModal={() => setShowSource(false)} />
          <Text className="text-white text-center text-base font-bold mt-3">
            Select {title}
          </Text>

          {sources.map((source) => (
            <TouchableOpacity
              onPress={() => updateSource(source)}
              style={{ gap: 20 }}
              className="flex-row items-center mt-6 border-b pb-3 border-card-bg-dark px-2"
              key={source._id}
            >
              <View className="bg-card-bg-dark rounded-md p-2">
                {getIcon({ name: source.icon.name })[source.icon.group]}
              </View>
              <Text className="text-white font-bold text-lg">
                {source.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
}
