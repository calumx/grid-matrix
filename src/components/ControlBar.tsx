import { Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, Flex, useColorMode, useDisclosure } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useContext } from 'preact/hooks';
import { GameStateContext } from '../context/gameStateContext';
import { DotContext } from '../context/dotContext';
import { useCountdown } from '../helpers/useCountdown';
import { GameControls } from './GameControls';

export const ControlBar = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateDotData } = useContext(DotContext);
  const { startCountdown } = useCountdown();
  const { toggleColorMode } = useColorMode();
  const {
    updateGameState,
    gameState: { countdownActive, gameActive, gameComplete },
  } = useContext(GameStateContext);

  const handleClick = () => {
    if (gameComplete) {
      updateDotData({ type: 'RESET_DOTS' });
      return updateGameState({ type: 'RESET_GAME_STATE' });
    }

    if (!countdownActive && !gameActive) {
      return startCountdown();
    }

    updateGameState({ type: 'STOP_GAME' });
    return updateDotData({ type: 'RESET_DOTS' });
  };

  return (
    <Flex
      {...props}
      position={'fixed'}
      top={0}
      height='10vw'
      backgroundColor='orange.400'
      width='100vw'
      color='#fff'
      justify={'space-between'}
      align={'center'}
      padding='1.5rem 1rem'
    >
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>SETTINGS</DrawerHeader>
          <DrawerBody>
            <GameControls />
            <Button mt='2rem' w='100%' colorScheme='teal' onClick={toggleColorMode}>
              TOGGLE THEME
            </Button>
            <Button mt='1rem' w='100%' colorScheme='red' onClick={onClose}>
              CLOSE
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button
        size={['xs', 'sm', 'md', 'lg']}
        bgColor={'blue.800'}
        color='#fff'
        leftIcon={<SettingsIcon />}
        onClick={onOpen}
        isDisabled={countdownActive || gameActive}
      >
        SETTINGS
      </Button>
      <Button size={['xs', 'sm', 'md', 'lg']} colorScheme={countdownActive || gameActive ? 'red' : 'green'} onClick={handleClick}>
        {!countdownActive && !gameActive ? 'START GAME' : gameComplete ? 'TRY AGAIN' : 'STOP GAME'}
      </Button>
    </Flex>
  );
};
