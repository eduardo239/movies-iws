import { useUser } from '../../../utils/useUser';
import { useEffect, useState } from 'react';
import MovieListItem from '../../../components/MovieListItem';
import { removeItemFromProfile } from '../../../utils/movies';

export default function WatchedMovies() {
  const [watched, setWatched] = useState([]);
  const { profile } = useUser();

  useEffect(() => {
    setWatched(profile?.movies_watched);
  }, [profile]);

  const mapMovies = () => {
    return watched
      .map((x) => (
        <MovieListItem content={x} key={x.id} removeItem={removeItem} />
      ))
      .reverse();
  };

  const removeItem = async (x, table) => {
    const { movies_watched } = await removeItemFromProfile(
      x,
      profile.user_id,
      0
    );
    setWatched(movies_watched);
  };

  return (
    <section>
      <h1>Todos os filmes que já vi:</h1>
      {/* TODO: verificar quando valor for 0 */}
      {watched ? mapMovies() : <h4>Não filmes aqui.</h4>}
    </section>
  );
}
