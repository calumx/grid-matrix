import { useCallback, useContext, useEffect, useState } from 'preact/hooks';
import { DotContext } from '../context/dotContext';
import { GameStateContext } from '../context/gameStateContext';

export const useDotLifecycle = () => {
  const [lifecycleActive, setLifecycleActive] = useState(false);
  const {
    updateGameState,
    gameState: { displayTime },
  } = useContext(GameStateContext);
  const {
    updateDotData,
    dotData: { allDots, activeDot },
  } = useContext(DotContext);

  const startDotDisplay = () => setLifecycleActive(true);
  const stopDotDisplay = () => setLifecycleActive(false);

  const getRandomDot = useCallback(() => {
    if (!allDots.length) {
      setLifecycleActive(false);
      return updateGameState({ type: 'END_GAME' });
    }
    const randomIndex = Math.floor(Math.random() * allDots.length);
    const randomDot = allDots[randomIndex];
    return randomDot;
  }, [allDots, updateGameState]);

  useEffect(() => {
    if (!lifecycleActive || activeDot.id) return;
    const createNewDotTimeout = setTimeout(() => {
      const randomDot = getRandomDot();
      updateDotData({ type: 'SET_ACTIVE_DOT', payload: randomDot });
    }, displayTime);
    return () => clearTimeout(createNewDotTimeout);
  }, [lifecycleActive, activeDot, displayTime, getRandomDot, updateDotData]);

  useEffect(() => {
    if (activeDot?.id) {
      const destroyDotTimeout = setTimeout(() => {
        updateDotData({ type: 'MARK_DOT_SHOWN', payload: activeDot });
        updateDotData({ type: 'SET_ACTIVE_DOT', payload: {} });
      }, displayTime);

      return () => clearTimeout(destroyDotTimeout);
    }
  }, [activeDot, displayTime, getRandomDot, updateDotData]);

  return { startDotDisplay, stopDotDisplay };
};
