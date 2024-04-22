import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardShow = (event: KeyboardEvent) => {
    setKeyboardShown(true);
    setKeyboardHeight(event.endCoordinates.height);
  };

  const onKeyboardHide = () => {
    setKeyboardShown(false);
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const keyboardShowService = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow
    );

    const keyboardHideService = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide
    );

    return () => {
      keyboardShowService.remove();
      keyboardHideService.remove();
    };
  }, []);

  return { keyboardHeight, keyboardShown };
};
