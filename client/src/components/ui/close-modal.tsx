import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type CloseModalPros = {
  onCloseModal: () => void;
};

export function CloseModal({ onCloseModal }: CloseModalPros) {
  return (
    <TouchableOpacity onPress={onCloseModal}>
      <AntDesign name="arrowleft" size={24} color="white" />
    </TouchableOpacity>
  );
}
