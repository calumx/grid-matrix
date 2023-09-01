import { useEffect, useState } from 'preact/hooks';
import { TheGrid } from './TheGrid';
import { useContext } from 'preact/hooks';
import { DotContext } from '../context/dotContext';
import { GameStateContext } from '../context/gameStateContext';
import { useRecords } from '../helpers/useRecords';
import {
  Badge,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Flex,
  Text,
  Spacer,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

export const PopupResults = ({ open }: { open: boolean }) => {
  const [newRecordAchieved, setNewRecordAchieved] = useState(false);
  const { checkScoreAgainstRecords } = useRecords();
  const { onClose } = useDisclosure();
  const { updateGameState } = useContext(GameStateContext);
  const {
    updateDotData,
    dotData: { lineLength, clickedDots, shownDots },
  } = useContext(DotContext);

  useEffect(() => {
    const newRecord = checkScoreAgainstRecords();
    if (newRecord) setNewRecordAchieved(true);

    return () => setNewRecordAchieved(false);
  }, [checkScoreAgainstRecords]);

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align={'center'}>
            RESULTS
            {newRecordAchieved && (
              <Badge ml='0.5rem' colorScheme='green'>
                NEW RECORD!
              </Badge>
            )}
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Center flexDir={'column'}>
            <Flex w={`${lineLength * 1.1}px`} mb='1rem'>
              <Text as='b' mr='0.25rem'>
                Clicked:
              </Text>
              <Text>{clickedDots.length}</Text>
              <Spacer />
              <Text as='b' mr='0.25rem'>
                Missed:
              </Text>
              <Text>{shownDots.length - clickedDots.length}</Text>
            </Flex>
            <TheGrid />
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button
            w='100%'
            colorScheme='green'
            onClick={() => {
              onClose();
              updateDotData({ type: 'RESET_DOTS' });
              return updateGameState({ type: 'RESET_GAME_STATE' });
            }}
          >
            PLAY AGAIN
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
