import { CloseModal } from '@/components/ui/close-modal';
import { useGetAuth } from '@/hooks/use-get-auth';
import { AUTH } from '@/utils/firebase.config';
import { toast } from '@/utils/helpers/toast.helper';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type ProfileModalProps = {
  show: boolean;
  onClose: () => void;
};

export function ProfileModal({ show, onClose }: ProfileModalProps) {
  const { auth } = useGetAuth();
  const [signOut] = useSignOut(AUTH);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Successfully Sing Out');
    onClose();
  };
  return (
    <Modal animationType="slide" visible={show}>
      <View className="bg-bg-dark flex-1 pt-4 px-6">
        <CloseModal onCloseModal={onClose} />
        <Text className="text-4xl mt-10 font-bold text-primary-500 mb-12 text-center">
          Cash-IO
        </Text>
        <View
          style={{ height: 150, width: 150 }}
          className="rounded-full bg-card-bg-dark mx-auto flex items-center justify-center"
        >
          <Text className="text-white text-7xl">{auth?.displayName?.[0]}</Text>
        </View>
        <Text className="text-white text-center mt-6 text-4xl">
          {auth?.displayName}
        </Text>

        <View className="items-center mt-12 border-t border-neutral-400 pt-5">
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-error-600 px-5 py-2 rounded-lg"
          >
            <Text className="text-xl font-bold text-white">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
