import { useContext, useEffect } from 'preact/hooks';
import { GameStateContext } from '../context/gameStateContext';

export const useCountdown = () => {
  const {
    updateGameState,
    gameState: { countdown, countdownActive },
  } = useContext(GameStateContext);

  const startCountdown = () => updateGameState({ type: 'START_COUNTDOWN' });

  useEffect(() => {
    if (countdownActive && countdown > 0) {
      const countdownInterval = setInterval(() => updateGameState({ type: 'DECREMENT_COUNTDOWN' }), 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [countdownActive, countdown, updateGameState]);

  useEffect(() => {
    if (countdown === 0) updateGameState({ type: 'BEGIN_GAME' });
  }, [countdown, updateGameState]);

  return { startCountdown };
};
