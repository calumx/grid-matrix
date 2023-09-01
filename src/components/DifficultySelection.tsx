import { Button, Heading, Stack } from '@chakra-ui/react';
import { useContext } from 'preact/hooks';
import { GameStateContext } from '../context/gameStateContext';

export const DifficultySelection = () => {
  const { gameState, updateGameState } = useContext(GameStateContext);

  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <Stack>
      <Heading size='md'>DIFFICULTY</Heading>
      {[0, 1, 2].map((difficultyId) => {
        return (
          <Button
            isDisabled={gameState.gameActive || gameState.countdownActive || gameState.gameComplete}
            key={`btn-${difficultyId}`}
            textTransform={'uppercase'}
            onClick={() => updateGameState({ type: 'SET_DIFFICULTY', payload: difficultyId })}
            colorScheme={gameState.difficulty === difficultyId ? 'orange' : undefined}
          >
            {difficulties[difficultyId]}
          </Button>
        );
      })}
    </Stack>
  );
};
