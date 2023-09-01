import { Box, useColorMode } from '@chakra-ui/react';

export const GraphLine = ({ horizontal }: { horizontal?: boolean }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bgColor={colorMode === 'dark' ? '#fff' : '#000'}
      position={'absolute'}
      width={horizontal ? '100%' : '1px'}
      height={horizontal ? '1px' : '100%'}
      left={horizontal ? 0 : '50%'}
      top={horizontal ? '50%' : 0}
      transform={horizontal ? 'translateY(-50%)' : 'translateX(-50%)'}
    />
  );
};
