import { useUser } from '../../../utils/useUser';
import { useEffect, useState } from 'react';
import MovieListItem from '../../../components/MovieListItem';

export default function ToSeeMovies() {
  const [toSee, setToSee] = useState([]);
  const { profile } = useUser();

  useEffect(() => {
    setToSee(profile?.movies_to_see);
  }, [profile]);

  const mapMovies = () => {
    return toSee.map((x) => <MovieListItem content={x} key={x.id} />).reverse();
  };

  return (
    <section>
      <h1>Todos os filmes que vou ver:</h1>
      {toSee ? mapMovies() : <h4>Não filmes aqui.</h4>}
    </section>
  );
}
