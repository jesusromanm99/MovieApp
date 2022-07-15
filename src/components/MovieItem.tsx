import {View, Pressable, StyleSheet} from 'react-native';
import {Movie} from '../types/MoviesTypes';
import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Row, Text, Column, Image} from 'native-base';
import globalStyles from '../styles/globalStyles';
const MovieItem: FC<Movie> = movie => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.movieContainer}
      onPress={() =>
        navigation.navigate('DetailMoviePage', {imdbID: movie.imdbID})
      }>
      <Row>
        <Image
          w={150}
          minH={250}
          source={{
            uri: movie.Poster,
          }}
          resizeMode="cover"
          alt={`${movie.Title} image`}
          style={styles.movieImage}
        />
        <Column mx={2} flexGrow={1} flexShrink={1}>
          <Text color={'gray.100'} fontSize={20}>
            {movie.Title}
          </Text>
          <Text color={'gray.500'}>{movie.Plot}</Text>
          <Text color={'yellow.500'} fontSize={26}>
            {movie.imdbRating}
          </Text>
        </Column>
      </Row>
    </Pressable>
  );
};
const BORDER_RADIUS = 15;
const styles = StyleSheet.create({
  movieContainer: {
    ...globalStyles.bgColorSecondary,
    marginVertical: 7,
    borderRadius: BORDER_RADIUS,
  },
  title: {
    color: 'red',
  },
  movieImage: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
});
export default MovieItem;
