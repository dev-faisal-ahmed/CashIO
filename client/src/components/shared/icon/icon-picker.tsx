import {
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { AntDesign } from '@expo/vector-icons';
import { Sheet } from '@/components/ui/sheet';
import { TIconGroup, TIconName, TIconType, getIcon } from './icon-helper';
import { icons } from './icons';

// icon picker context
export const IconPickerContext = createContext<{
  icon: TIconType | undefined;
  setIcon: Dispatch<SetStateAction<TIconType | undefined>>;
} | null>(null);

export function IconPickerProvider({ children }: PropsWithChildren) {
  const [icon, setIcon] = useState<TIconType>();

  return (
    <IconPickerContext.Provider value={{ icon, setIcon }}>
      {children}
    </IconPickerContext.Provider>
  );
}

type TIcons = Record<string, Record<string, string>>;

const iconsArray = Object.keys(icons).reduce(
  (acc: { group: string; name: string }[], iconGroup) => {
    const iconGroupArray = Object.keys((icons as TIcons)[iconGroup]).map(
      (name) => ({
        group: iconGroup,
        name,
      })
    );
    return [...acc, ...iconGroupArray];
  },
  []
);

function IconPickerComponent() {
  const iconPickerContext = useContext(IconPickerContext);
  const [open, setOpen] = useState(false);
  const { icon, setIcon } = iconPickerContext!;

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const updateIcon = (payload: TIconType) => {
    setIcon(payload);
    handleClose();
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleOpen}
        className="items-center h-52 w-52 justify-center bg-card-bg-dark/40 rounded-full mx-auto"
      >
        {icon ? (
          <>{getIcon({ name: icon.name, size: 100 })[icon.group]}</>
        ) : (
          <AntDesign name="plus" size={40} color="white" />
        )}
      </TouchableOpacity>
      <Sheet isOpen={open} close={handleClose} position="TOP">
        <FlatList
          data={iconsArray}
          numColumns={4}
          contentContainerStyle={{ gap: 10 }}
          renderItem={(eachData) => (
            <TouchableWithoutFeedback
              onPress={() =>
                updateIcon({
                  group: eachData.item.group as TIconGroup,
                  name: eachData.item.name as TIconName,
                })
              }
            >
              <View className="flex-1 items-center justify-center bg-bg-dark/60 mx-3 p-2 rounded-xl">
                {
                  getIcon({ name: eachData.item.name as TIconName })[
                    eachData.item.group as TIconGroup
                  ]
                }
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(eachData) => `${eachData.name}-${eachData.group}`}
        />
      </Sheet>
    </>
  );
}

export function IconPicker() {
  return (
    <IconPickerProvider>
      <IconPickerComponent />
    </IconPickerProvider>
  );
}
