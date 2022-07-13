import React, {FC} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//Screens
import MoviePage from './src/screens/MoviePage';

const App: FC = () => {
  return (
    <NavigationContainer>
      <MoviePage />
    </NavigationContainer>
  );
};
export default App;
