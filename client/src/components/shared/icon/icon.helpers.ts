import { TIcon } from './icon-helper';

export const generateTuple = (allIcons: TIcon[], column: number) => {
  const tuple: TIcon[][] = [];
  let tempIcons: TIcon[] = [];

  allIcons.forEach((eachIcon) => {
    tempIcons.push(eachIcon);
    // when ever it reaches to the column count it resets
    if (tempIcons.length === column) {
      tuple.push(tempIcons);
      tempIcons = [];
    }
  });

  // if still anything remail in tuple
  if (tempIcons.length) {
    tuple.push(tempIcons);
  }

  return tuple;
};

export const generateArray = (size: number) => {
  const newArray: number[] = [];
  for (let i = 0; i < size; i++) {
    newArray.splice(i);
  }

  return newArray;
};
