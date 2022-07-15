import axiosClient from './axiosClient';
import {Movie} from '../types/MoviesTypes';

const searchMovieAPI = async (
  title: string,
  year: string = '',
): Promise<Movie[] | null> => {
  const params = {s: title, y: year, type: 'movie'};
  try {
    let {data: movies} = await axiosClient.get('', {params});
    const moviesDetailed = await Promise.all(
      movies.Search.map((movie: Movie) => getMovieByTitle(movie.imdbID)),
    );

    return moviesDetailed;
  } catch (error) {
    return null;
  }
};
const getMovieByTitle = async (
  imdbID: string,
  plot: string = 'short',
): Promise<Movie | null> => {
  const params = {i: imdbID, plot};

  try {
    const {data} = await axiosClient.get<Movie>('', {params});
    return data;
  } catch (error) {
    return null;
  }
};
export {searchMovieAPI, getMovieByTitle};
