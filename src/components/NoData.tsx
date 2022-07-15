import React, {FC} from 'react';
import {Text, Box} from 'native-base';
type Props = {
  description: string;
};
const NoData: FC<Props> = props => {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Text color={'gray.100'}>{props.description}</Text>
    </Box>
  );
};
export default NoData;
