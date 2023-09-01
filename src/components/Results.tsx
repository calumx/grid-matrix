import { useContext, useEffect } from 'preact/hooks';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Divider, Flex } from '@chakra-ui/react';
import { DotContext } from '../context/dotContext';
import { GameStateContext } from '../context/gameStateContext';
import { useRecords } from '../helpers/useRecords';

export const Results = () => {
  const { recordsFromStorage, checkScoreAgainstRecords } = useRecords();
  const {
    gameState: { gameComplete },
  } = useContext(GameStateContext);
  const {
    dotData: { collectionName, shownDots, clickedDots, lineLength },
  } = useContext(DotContext);

  useEffect(() => {
    if (gameComplete) checkScoreAgainstRecords();
  }, [gameComplete, checkScoreAgainstRecords]);

  return (
    <Stack border={`3px solid grey`} borderRadius='12px' padding='2rem' spacing={3} width='20vw' height={lineLength * 1.1}>
      <Heading fontSize={{ base: 'md', lg: '2xl', xl: '4xl' }}>RESULTS</Heading>
      <Divider />
      <Heading size='md'>THIS GAME</Heading>
      <Stack spacing={0}>
        <Flex w='120px' justify={'space-between'}>
          <Text>{'Clicked:'}</Text>
          <Text>{gameComplete ? clickedDots.length : '--'}</Text>
        </Flex>
        <Flex w='120px' justify={'space-between'}>
          <Text>{'Missed:'}</Text>
          <Text>{gameComplete ? shownDots.length - clickedDots.length : '--'}</Text>
        </Flex>
      </Stack>
      <Divider />
      <Heading size='md'>RECORDS</Heading>
      <Text>{`"${collectionName}"`}</Text>
      <Stack spacing={0} w='100%'>
        <Flex w='120px' justify={'space-between'}>
          <Text>{'Easy:'}</Text>
          <Text>{recordsFromStorage[collectionName]?.easy || '--'}</Text>
        </Flex>
        <Flex w='120px' justify={'space-between'}>
          <Text>{'Medium:'}</Text>
          <Text>{recordsFromStorage[collectionName]?.medium || '--'}</Text>
        </Flex>
        <Flex w='120px' justify={'space-between'}>
          <Text>{'Hard:'}</Text>
          <Text>{recordsFromStorage[collectionName]?.hard || '--'}</Text>
        </Flex>
      </Stack>
    </Stack>
  );
};
