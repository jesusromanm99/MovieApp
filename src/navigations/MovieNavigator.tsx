import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviePage from '../screens/MoviePage';
import DetailMoviePage from '../screens/DetailMoviePage';
import globalStyles from '../styles/globalStyles';
export type MovieStackParams = {
  MoviePage: undefined;
  DetailMoviePage: {
    Title: string;
    imdbID: string;
  };
};
const MovieStack = createStackNavigator<MovieStackParams>();
const MovieNavigation: FC = () => {
  return (
    <MovieStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          ...globalStyles.bgColorPrimary,
        },
      }}>
      <MovieStack.Screen name="MoviePage" component={MoviePage} />
      <MovieStack.Screen name="DetailMoviePage" component={DetailMoviePage} />
    </MovieStack.Navigator>
  );
};

export default MovieNavigation;
