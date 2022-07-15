import axiosClient from './axiosClient';
import {Movie} from '../types/MoviesTypes';
type error = {
  Response?: string;
  Error?: string;
};
const searchMovieAPI = async (
  title: string,
  year: string = '',
): Promise<Movie[] | null> => {
  const params = {s: title, y: year, type: 'movie'};
  try {
    let {data} = await axiosClient.get('', {params});
    const moviesDetailed = await Promise.all(
      data.Search.map((movie: Movie) => getMovieByImdbID(movie.imdbID)),
    );
    return moviesDetailed;
  } catch (error) {
    return null;
  }
};
const getMovieByImdbID = async (
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
export {searchMovieAPI, getMovieByImdbID};
