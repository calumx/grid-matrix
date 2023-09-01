import { Box } from '@chakra-ui/react';
import { useContext } from 'preact/hooks';
import { DotContext } from '../context/dotContext';
import { GameStateContext } from '../context/gameStateContext';

type DotProps = {
  id: string;
  size: number;
  isActive?: boolean;
  transition?: string;
  top: number | undefined;
  left: number | undefined;
};

export const IndividualDot = ({ id, size, isActive, transition, top, left }: DotProps) => {
  const {
    updateDotData,
    dotData: { clickedDots },
  } = useContext(DotContext);
  const {
    gameState: { countdownActive, gameComplete },
  } = useContext(GameStateContext);

  const handleDotClick = (dot: string) => {
    if (clickedDots.includes(dot)) return;
    return updateDotData({ type: 'ADD_SEEN_DOT', payload: dot });
  };

  const getDotColor = (dotId: string) => {
    if (!gameComplete) return 'orange.400';
    const dotWasClicked = clickedDots.find((clicked) => clicked === dotId);
    if (dotWasClicked) return 'green';
    return 'red';
  };

  return (
    <Box
      id={id}
      height={`${size * 0.05}px`}
      width={`${size * 0.05}px`}
      borderRadius='50%'
      transform='translate(-50%, -50%)'
      transition={transition}
      bgColor={getDotColor(id)}
      cursor={isActive ? 'pointer' : 'auto'}
      onClick={() => (isActive ? handleDotClick(id) : null)}
      opacity={countdownActive && !isActive ? 0 : 1}
      position='absolute'
      top={`${top}px`}
      left={`${left}px`}
    ></Box>
  );
};
