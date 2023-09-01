import { Button, Heading, Stack } from '@chakra-ui/react';
import { useContext } from 'preact/hooks';
import { GameStateContext } from '../context/gameStateContext';
import { useCountdown } from '../helpers/useCountdown';
import { DotContext } from '../context/dotContext';

export const StartStopButtons = () => {
  const { gameState, updateGameState } = useContext(GameStateContext);
  const { updateDotData } = useContext(DotContext);
  const { startCountdown } = useCountdown();

  const resetGame = () => {
    updateDotData({ type: 'RESET_DOTS' });
    updateGameState({ type: 'RESET_GAME_STATE' });
  };

  return (
    <Stack display={{ base: 'none', lg: 'flex' }}>
      <Heading size={'md'} display={{ base: 'none', lg: 'block' }}>
        CONTROLS
      </Heading>
      <Button
        isDisabled={gameState.gameActive || gameState.countdownActive}
        colorScheme='green'
        onClick={() => (gameState.gameComplete ? resetGame() : startCountdown())}
      >
        {gameState.gameComplete ? 'TRY AGAIN' : 'START GAME'}
      </Button>
      <Button
        isDisabled={!gameState.countdownActive && !gameState.gameActive}
        colorScheme='red'
        onClick={() => {
          updateGameState({ type: 'STOP_GAME' });
          updateDotData({ type: 'RESET_DOTS' });
        }}
      >
        STOP GAME
      </Button>
    </Stack>
  );
};
