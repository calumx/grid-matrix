import { Center } from '@chakra-ui/react';
import { useContext } from 'preact/hooks';
import { GameStateContext } from '../context/gameStateContext';

export const Countdown = () => {
  const {
    gameState: { countdown },
  } = useContext(GameStateContext);

  return (
    <Center width='100%' height='100%' fontSize={'12rem'} color='red' zIndex='100'>
      {countdown}
    </Center>
  );
};
