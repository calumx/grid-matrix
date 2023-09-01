import { useContext, useEffect } from 'preact/hooks';
import { Center } from '@chakra-ui/react';
import { GraphLine } from './GraphLine';
import { GameStateContext } from '../context/gameStateContext';
import { Countdown } from './Countdown';
import { DotContext, ActiveDot } from '../context/dotContext';
import { IndividualDot } from './IndividualDot';

export const TheGrid = () => {
  const {
    updateDotData,
    dotData: { allDots, activeDot, shownDots, lineLength },
  } = useContext(DotContext);
  const {
    gameState: { countdownActive, countdown, gameComplete },
  } = useContext(GameStateContext);

  useEffect(() => {
    //TODO: make this react to resizing
    const getLineLength = () => {
      const smallestViewportDimension = Math.min(window.innerWidth, window.innerHeight);
      return updateDotData({ type: 'SET_LINE_LENGTH', payload: smallestViewportDimension * 0.65 });
    };

    getLineLength();

    window.addEventListener('resize', getLineLength);

    return () => {
      window.removeEventListener('resize', getLineLength);
    };
  }, []);

  return (
    <Center
      width={`${lineLength * 1.1}px`}
      height={`${lineLength * 1.1}px`}
      //this is a container so slightly bigger than the actual matrix
      border={`3px solid grey`}
      borderRadius='12px'
    >
      <Center height={`${lineLength}px`} width={`${lineLength}px`} position='relative'>
        {countdownActive && countdown > 0 && <Countdown />}
        <GraphLine horizontal />
        <GraphLine />
        {!gameComplete &&
          allDots.map((dot: ActiveDot, idx) => {
            return (
              <IndividualDot
                key={dot.id}
                id={dot.id}
                size={lineLength}
                isActive={activeDot.id === dot.id}
                transition={activeDot.id === dot.id || !countdownActive ? 'none' : `opacity 500ms ease ${idx * 7}ms`}
                top={dot.top}
                left={dot.left}
              />
            );
          })}
        {gameComplete &&
          shownDots.map((dot: ActiveDot) => {
            return <IndividualDot key={dot.id} id={dot.id} size={lineLength} top={dot.top} left={dot.left} />;
          })}
      </Center>
    </Center>
  );
};
