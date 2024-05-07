import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Sheet } from '@/components/ui/sheet';
import { TIconGroup, TIconName, TIcon } from './icon-helper';
import { icons } from './icons';
import { useKeyboard } from '@/hooks/use-keyboard';
import { twMerge } from 'tailwind-merge';
import { getDimension } from '@/utils/helpers/ui.helper';
import { Icon } from './icon';

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

type IconPickerProps = {
  icon: TIcon | undefined;
  updateIcon: (payload: TIcon) => void;
};

const { width } = getDimension();
const iconContainerWidth = (width - 32 - 64 - 48) / 5;

export function IconPicker({ icon, updateIcon }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const { keyboardShown } = useKeyboard();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const onIconChange = (payload: TIcon) => {
    updateIcon(payload);
    handleClose();
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleOpen}
        className={twMerge(
          'items-center  justify-center bg-card-bg-dark rounded-full mx-auto',
          keyboardShown ? 'w-28 h-28' : 'h-52 w-52',
          open ? 'bg-card-bg-dark/60' : ''
        )}
      >
        {icon ? (
          <>
            <Icon
              name={icon.name}
              group={icon.group}
              size={keyboardShown ? 50 : 100}
            />
          </>
        ) : (
          <AntDesign name="plus" size={40} color="white" />
        )}
      </TouchableOpacity>
      <Sheet
        style={{ padding: 16 }}
        isOpen={open}
        close={handleClose}
        position="TOP"
        sheetWidth={width - 48}
      >
        <View style={{ gap: 16 }} className="flex-row flex-wrap">
          {iconsArray.map((icon) => (
            <TouchableWithoutFeedback
              onPress={() =>
                onIconChange({
                  group: icon.group as TIconGroup,
                  name: icon.name as TIconName,
                })
              }
              key={`${icon.group}:${icon.name}`}
            >
              <View
                style={{ width: iconContainerWidth }}
                className="items-center justify-center bg-bg-dark/60 p-2 rounded-xl"
              >
                <Icon
                  name={icon.name as TIconName}
                  group={icon.group as TIconGroup}
                  size={20}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Sheet>
    </>
  );
}
