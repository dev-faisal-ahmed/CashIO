import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Sheet } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

export function IconPicker() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="items-center h-52 w-52 justify-center bg-card-bg-dark/40 rounded-full mx-auto"
      >
        <AntDesign name="plus" size={40} color="white" />
      </TouchableOpacity>
      <Sheet isOpen={open} close={handleClose} position="TOP">
        <Text>Hi</Text>
      </Sheet>
    </>
  );
}
