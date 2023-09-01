import { Heading, Select, Stack } from '@chakra-ui/react';
import { entireDotLibrary } from '../helpers/dotLibrary';
import { ChangeEvent, useContext } from 'preact/compat';
import { DotContext } from '../context/dotContext';
import { GameStateContext } from '../context/gameStateContext';

export const DotSelection = () => {
  const {
    gameState: { gameActive, countdownActive, gameComplete },
  } = useContext(GameStateContext);
  const {
    dotData: { collectionName },
    updateDotData,
  } = useContext(DotContext);

  const handleSelection = (selection: string) => {
    const newSelection = entireDotLibrary.find((collection) => collection.collectionName === selection);
    updateDotData({ type: 'UPDATE_DOTS_USED', payload: newSelection });
  };

  return (
    <Stack>
      <Heading size='md'>LAYOUT</Heading>
      <Select
        isDisabled={gameActive || countdownActive || gameComplete}
        value={collectionName}
        onChange={(e: ChangeEvent) => handleSelection((e.target as HTMLInputElement).value)}
      >
        {entireDotLibrary.map((collection) => {
          return (
            <option key={collection.collectionName} value={collection.collectionName}>
              {collection.collectionName}
            </option>
          );
        })}
      </Select>
    </Stack>
  );
};
