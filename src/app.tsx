import { Flex, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { TheGrid } from './components/TheGrid';
import { GameControls } from './components/GameControls';
import { useContext, useEffect } from 'preact/hooks';
import { GameStateContext } from './context/gameStateContext';
import { DotContext } from './context/dotContext';
import { useDotLifecycle } from './helpers/useDotLifecycle';
import { Results } from './components/Results';
import { ControlBar } from './components/ControlBar';
import { PopupResults } from './components/PopupResults';
import { ThemeSelection } from './components/ThemeSelection';

export const App = () => {
  const variant = useBreakpointValue({ base: 'smallScreen', lg: 'largeScreen' });
  const { startDotDisplay, stopDotDisplay } = useDotLifecycle();
  const {
    dotData: { activeDot },
  } = useContext(DotContext);
  const {
    gameState: { gameActive, gameComplete },
  } = useContext(GameStateContext);

  useEffect(() => {
    if (!gameActive || activeDot.id) return;
    return startDotDisplay();
  }, [gameActive, activeDot, startDotDisplay]);

  useEffect(() => {
    if (!gameActive) return stopDotDisplay();
  }, [gameActive, stopDotDisplay]);

  return (
    <Flex flexDir={{ base: 'column', lg: 'row' }} align='center' w='100vw' h='100vh' pt={{ base: 'calc(10vh + 3rem)', lg: 0 }} px={'3rem'}>
      {variant === 'largeScreen' && <ThemeSelection />}
      {variant === 'smallScreen' && <ControlBar />}
      {variant === 'largeScreen' && <GameControls />}
      <Spacer />
      <TheGrid />
      <Spacer />
      {variant === 'smallScreen' && <PopupResults open={gameComplete} />}
      {variant === 'largeScreen' && <Results />}
    </Flex>
  );
};
