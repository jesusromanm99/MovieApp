import {StackScreenProps} from '@react-navigation/stack';

import React, {FC, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MovieStackParams} from '../navigations/MovieNavigator';
import {Movie} from '../types/MoviesTypes';
import {getMovieByImdbID} from '../utils/https';
import {Image, Row, Text, Box} from 'native-base';
import globalStyle from '../styles/globalStyles';
import Spinner from '../components/Spinner';
type Props = StackScreenProps<MovieStackParams, 'DetailMoviePage'>;

const DetailMoviePage: FC<Props> = ({route}) => {
  const {imdbID} = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoadingMovie, setIsLoadingMovie] = useState<boolean>(true);
  const loadPage = async (): Promise<void> => {
    setIsLoadingMovie(true);
    const data = await getMovieByImdbID(imdbID, 'full');
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
            w="100%"
            h={600}
            src={
              movie?.Poster == 'N/A'
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_yh7gI-s3P1HxJR9zI2Gvy3zG9BOJezG0sQ&usqp=CAU'
                : movie?.Poster
            }
            alt={`${movie?.Title} image`}
            resizeMode="stretch"
          />
          <Box style={globalStyle.mainContainer} pb={5}>
            <Box style={[styles.card]} mt={-70} m="auto">
              <Row justifyContent={'space-between'} alignItems="center">
                <Text color={'green.100'} fontSize={20} flexGrow={1} maxW="90%">
                  {movie?.Title}
                </Text>
                <Text color={'yellow.500'} fontSize={25} ml={1}>
                  {movie?.imdbRating == 'N/A' ? '1.0' : movie?.imdbRating}
                </Text>
              </Row>
              <Text color={'gray.500'} fontSize={14}>
                {movie?.Plot == 'N/A' ? 'Sin descripción' : movie?.Plot}
              </Text>
            </Box>
            <Box style={styles.card} mt={4}>
              <Text fontSize={16} color={'gray.500'}>
                <Text color={'gray.100'}>Director :</Text>{' '}
                {movie?.Director == 'N/A' ? 'Sin información' : movie?.Director}
              </Text>
              <Text fontSize={16} color={'gray.500'}>
                <Text color={'gray.100'}>Actores:</Text>{' '}
                {movie?.Actors == 'N/A' ? 'Sin información' : movie?.Actors}
              </Text>
              <Text fontSize={16} color={'gray.500'}>
                <Text color={'gray.100'}>Género :</Text>{' '}
                {movie?.Genre == 'N/A' ? 'Sin información' : movie?.Genre}
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
    width: '100%',
    minHeight: 90,
  },
});
export default DetailMoviePage;
