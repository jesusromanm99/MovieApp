import React, {FC} from 'react';
import {Spinner as SpninnerNB, Box} from 'native-base';

const Spinner: FC = () => {
  return (
    <Box flex={1} justifyContent="center">
      <SpninnerNB color={'gray.100'} size={'lg'} />
    </Box>
  );
};
export default Spinner;
