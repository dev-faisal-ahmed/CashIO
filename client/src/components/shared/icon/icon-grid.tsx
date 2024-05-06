import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { TIcon } from './icon-helper';
import { generateArray, generateTuple } from './icon.helpers';
import { Icon } from './icon';

type IconGrid = {
  allIcons: TIcon[];
  onIconChange: (payload: TIcon) => void;
  column: number;
};

const iconRow = (
  icons: TIcon[],
  onIconChange: (payload: TIcon) => void,
  column: number
) => {
  return (
    <View className="w-full">
      {icons.map((icon) => (
        <TouchableWithoutFeedback
          onPress={() =>
            onIconChange({
              group: icon.group,
              name: icon.name,
            })
          }
        >
          <View className="items-center justify-center bg-bg-dark/50 mx-3 p-2 rounded-xl">
            <Icon name={icon.name} group={icon.group} />
          </View>
        </TouchableWithoutFeedback>
      ))}
      {icons.length < column && (
        <>
          {generateArray(column - icons.length).map((data) => (
            <View key={data} />
          ))}
        </>
      )}
    </View>
  );
};

export function IconGrid({ allIcons, onIconChange, column }: IconGrid) {
  return (
    <View className="w-full">
      {generateTuple(allIcons, column).map((eachIconArray) => (
        <React.Fragment key={Math.random() * 10000}>
          {iconRow(eachIconArray, onIconChange, column)}
        </React.Fragment>
      ))}
    </View>
  );
}
