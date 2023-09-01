import { Button, Stack, useColorMode } from '@chakra-ui/react';

export const ThemeSelection = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack position={'absolute'} top={4} right={6}>
      <Stack direction={'row'}>
        <Button textTransform={'uppercase'} onClick={toggleColorMode} colorScheme='blue'>
          {`${colorMode === 'light' ? 'dark' : 'light'} mode`}
        </Button>
      </Stack>
    </Stack>
  );
};
