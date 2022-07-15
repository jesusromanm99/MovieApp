import {StackScreenProps} from '@react-navigation/stack';

import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MovieStackParams} from '../navigations/MovieNavigator';
import {Movie} from '../types/MoviesTypes';
import {getMovieByTitle} from '../utils/https';
import {Column, Row, Text, Box} from 'native-base';
import globalStyle from '../styles/globalStyles';
import Spinner from '../components/Spinner';
type Props = StackScreenProps<MovieStackParams, 'DetailMoviePage'>;

const DetailMoviePage: FC<Props> = ({route}) => {
  const {imdbID} = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoadingMovie, setIsLoadingMovie] = useState<boolean>(true);
  const loadPage = async (): Promise<void> => {
    setIsLoadingMovie(true);
    const data = await getMovieByTitle(imdbID, 'full');
    setIsLoadingMovie(false);
    setMovie(data);
  };
  useEffect(() => {
    loadPage();
  }, []);
  return (
    <>
      {isLoadingMovie == true ? (
        <Spinner />
      ) : (
        <ScrollView>
          <Image
            style={styles.movieImage}
            source={{
              uri: movie?.Poster,
            }}
            resizeMode="cover"
          />
          <Box style={globalStyle.mainContainer} pb={5}>
            <Box style={[styles.card]} mt={-50} m="auto">
              <Row justifyContent={'space-between'} alignItems="center">
                <Text color={'green.100'} fontSize={20} flexGrow={1} maxW="90%">
                  {movie?.Title}
                </Text>
                <Text color={'yellow.500'} fontSize={25}>
                  {movie?.imdbRating}
                </Text>
              </Row>
              <Text color={'gray.500'} fontSize={14}>
                {movie?.Plot}
              </Text>
            </Box>
            <Box style={styles.card} mt={4}>
              <Text fontSize={16} color={'gray.500'}>
                <Text color={'gray.100'}>Director :</Text> {movie?.Director}
              </Text>
              <Text fontSize={16} color={'gray.500'}>
                <Text color={'gray.100'}>Actores:</Text> {movie?.Actors}
              </Text>
              <Text fontSize={16} color={'gray.500'}>
                <Text color={'gray.100'}>Género :</Text> {movie?.Genre}
              </Text>
            </Box>
          </Box>
        </ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  movieImage: {
    width: '100%',
    height: 600,
  },
  card: {
    backgroundColor: '#1c2e4a',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
});
export default DetailMoviePage;
