import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export const useContainer = () => {
  const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  return { containerSize, handleLayout };
};
