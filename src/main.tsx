import { render } from 'preact';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { GameStateProvider } from './context/gameStateContext.tsx';
import { DotProvider } from './context/dotContext.tsx';
import { App } from './app.tsx';
import customTheme from './theme.tsx';

render(
  <>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <ChakraProvider theme={customTheme}>
      <GameStateProvider>
        <DotProvider>
          <App />
        </DotProvider>
      </GameStateProvider>
    </ChakraProvider>
  </>,
  document.getElementById('app')!
);
