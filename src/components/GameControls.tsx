import { Flex } from '@chakra-ui/react';
import { DotSelection } from './DotSelection';
import { DifficultySelection } from './DifficultySelection';
import { StartStopButtons } from './StartStopButtons';
import { useContext } from 'preact/hooks';
import { DotContext } from '../context/dotContext';

export const GameControls = () => {
  const {
    dotData: { lineLength },
  } = useContext(DotContext);

  return (
    <Flex
      border={`3px solid grey`}
      borderRadius='12px'
      padding='1.5rem'
      gap={6}
      height={{ base: 'auto', lg: lineLength * 1.1 }}
      flexDir={'column'}
      w={{ base: 'auto', lg: '20vw' }}
    >
      <DotSelection />
      <DifficultySelection />
      <StartStopButtons />
    </Flex>
  );
};
