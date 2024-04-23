import { useContainer } from '@/hooks/use-container';
import { ReactNode, useMemo } from 'react';
import { View } from 'react-native';

type GridProps = {
  column?: number;
  spaceX?: number;
  spaceY?: number;
  padding?: number;
  children: ReactNode[];
};

export function Grid({
  column = 1,
  spaceX = 0,
  spaceY,
  padding = 0,
  children,
}: GridProps) {
  const { containerWidth, handleLayout } = useContainer();
  console.log(containerWidth);

  const elementWidth = useMemo(() => {
    return (containerWidth - 2 * padding - (column - 1) * spaceX) / column;
  }, [containerWidth, padding, column, spaceX]);

  return (
    <View
      className="flex-wrap flex-row"
      style={{ rowGap: spaceX, columnGap: spaceY ? spaceY : spaceX }}
      onLayout={handleLayout}
    >
      {children.map((each) => (
        <View style={{ width: elementWidth }} key={Math.random() * 1000}>
          {each}
        </View>
      ))}
    </View>
  );
}
