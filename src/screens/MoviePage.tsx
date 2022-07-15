import React, {FC, useEffect, useState} from 'react';
import {searchMovieAPI} from '../utils/https';
import {Movie} from '../types/MoviesTypes';
import MovieItem from '../components/MovieItem';
import Spinner from '../components/Spinner';
import {Row, Input, Button, Text} from 'native-base';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import NoData from '../components/NoData';
const MoviePage: FC = () => {
  const [titleSearch, setTitleSearch] = useState<string>('Batman');
  const [yearSearch, setYearSearch] = useState<string>('');
  const [movies, setMovies] = useState<Movie[] | null>();
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [error, setError] = useState('');
  const validateInputs = (): boolean => {
    if (!titleSearch) {
      setError('Introduzca la película a buscar');
      return false;
    }
    if (Number(yearSearch) < 0) {
      setError('Introduzca un año mayor que 0 (cero)');
      return false;
    }
    setError('');
    return true;
  };
  const getMovie = async () => {
    const isValid: boolean = validateInputs();
    if (!isValid) return;
    setIsLoadingMovies(true);
    const data = await searchMovieAPI(titleSearch, yearSearch);
    setIsLoadingMovies(false);

    if (data) setMovies(data);
    else setError('Película no encontrada');
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text fontSize={30} color={'green.100'}>
        OMDb Movies
      </Text>
      <Row mb={2}>
        <Input
          backgroundColor={'gray.100'}
          mr={1}
          flexGrow={1}
          placeholder="Titulo"
          value={titleSearch}
          onChangeText={value => setTitleSearch(value)}
        />
        <Input
          backgroundColor={'gray.100'}
          w={'30%'}
          placeholder="Año"
          value={yearSearch}
          keyboardType="numeric"
          onChangeText={value => setYearSearch(value)}
          maxLength={4}
        />
      </Row>
      <Button onPress={getMovie} mb={3}>
        Buscar
      </Button>
      {isLoadingMovies == false ? (
        error !== '' ? (
          <NoData description={error} />
        ) : (
          <FlatList
            data={movies}
            renderItem={({item}) => (
              <MovieItem
                Poster={item.Poster}
                Title={item.Title}
                imdbRating={item.imdbRating}
                Plot={item.Plot}
                imdbID={item.imdbID}
              />
            )}
            keyExtractor={(item: Movie) => item.imdbID}
          />
        )
      ) : (
        <Spinner />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 1,
  },
  searchInput__year: {
    width: '30%',
  },
});
export default MoviePage;
