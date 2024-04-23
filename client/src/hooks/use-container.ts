import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export const useContainer = () => {
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return { containerWidth, handleLayout };
};
