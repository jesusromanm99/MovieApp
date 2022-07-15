import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

//Screens
import MovieNavigator from './src/navigations/MovieNavigator';

const App: FC = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MovieNavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
