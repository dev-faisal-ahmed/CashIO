import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ActiveButton } from '../../../../../components/shared/active-button/active-button';
import { CloseModal } from '@/components/ui/close-modal';
import { getIcon } from '@/components/shared/icon/icon-helper';
import { getDimension } from '@/utils/helpers/ui.helper';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { TSource } from '@/utils/types/data.types';

type SourcePickerProps = {
  showSources: boolean;
  setShowSources: Dispatch<SetStateAction<boolean>>;
  sources: TSource[];
  selectedSource: TSource;
  onSourceUpdate: (source: TSource) => void;
};

const { width } = getDimension();

export function SourcePicker({
  showSources,
  setShowSources,
  sources,
  selectedSource,
  onSourceUpdate,
}: SourcePickerProps) {
  const remSources = useMemo(() => {
    return sources.filter((source) => source._id !== selectedSource._id);
  }, [sources, selectedSource]);
  return (
    <>
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-3 items-center">
          <MaterialIcons name="category" size={24} color="white" />
          <Text className="text-white text-base">Sources</Text>
        </View>
        <TouchableOpacity onPress={() => setShowSources(true)}>
          <Text className="text-xs text-white">More</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5 flex-row">
        <>
          {remSources.length ? (
            <>
              <ActiveButton
                _id={selectedSource._id}
                active_Id={selectedSource._id}
                onPress={() => onSourceUpdate(selectedSource)}
                value={selectedSource.name}
              />

              {remSources.slice(0, 2).map((source) => (
                <ActiveButton
                  key={source._id}
                  _id={source._id}
                  active_Id={selectedSource._id}
                  onPress={() => onSourceUpdate(source)}
                  value={source.name}
                />
              ))}
            </>
          ) : (
            <>
              <Text className="text-white font-bold text-center">
                No Source Found, Please Add A Source First
              </Text>
            </>
          )}
        </>
        <Modal animationType="slide" visible={showSources}>
          <View className="bg-bg-dark flex-1 px-6 py-5">
            <CloseModal onCloseModal={() => setShowSources(false)} />
            <Text className="text-white bold text-lg mt-5">
              Select Any Source
            </Text>

            <ScrollView className=" mt-5">
              <View style={{ gap: 20 }} className="flex-row flex-wrap">
                {sources.map((source) => (
                  <TouchableOpacity
                    key={source._id}
                    onPress={() => {
                      onSourceUpdate(source);
                      setShowSources(false);
                    }}
                  >
                    <View
                      className="flex-row items-center border border-white py-2 px-3 rounded-lg"
                      style={{ gap: 20, width: (width - 48 - 20) / 2 }}
                    >
                      {getIcon({ name: source.icon.name })[source.icon.group]}
                      <Text className="text-white font-semibold">
                        {source.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </>
  );
}
