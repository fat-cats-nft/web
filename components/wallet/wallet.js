import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useClipboard,
} from '@chakra-ui/react';
import { useContext } from 'react';

import { WalletContext } from '../contexts';
import commonStyles from '../common.module.css';
import walletStyles from './wallet.module.css';

export default function DisconnectWallet({ showDisconnectWallet, setDisconnectWallet }) {
  const { setShowDisconnectWallet, address } = useContext(WalletContext);
  const { hasCopied, onCopy } = useClipboard(address);

  const closeWallet = () => {
    setShowDisconnectWallet(false);
  };

  return (
    <Modal isOpen={showDisconnectWallet} onClose={closeWallet}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* TODO: add clipboard icon?  */}
          <div style={{ cursor: 'pointer' }} onClick={onCopy}>
            {address}
          </div>
          {hasCopied && (
            <div style={{ position: 'absolute', fontSize: '14px', color: 'grey' }}>Copied</div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setDisconnectWallet(true)}>
            Disconnect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
