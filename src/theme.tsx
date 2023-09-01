import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  ...config,
  styles: { global: { body: { boxSizing: 'border-box', userSelect: 'none', fontFamily: 'Jost, sans-serif;' } } },
});

export default theme;
