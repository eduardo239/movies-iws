import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import useFetch from '../../utils/useFetch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dateFormat } from '../../utils';
import { useEffect } from 'react';
import poster_default from '../../assets/poster.png';
import LazyLoad from 'react-lazy-load';

export default function Person() {
  const router = useRouter();
  const { id } = router.query;
  // const { user, profile } = useUser();

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
  );

  const { data: movieCredits } = useFetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
  );

  const mapMovies = () => {
    return movieCredits?.cast?.map((m) => (
      <div key={m.credit_id} className="person-movies-grid">
        <Link href={`/movie/${m.id}`} passHref>
          <a className="person-movies-grid__link">{m.title}</a>
        </Link>
        <div>{m.character}</div>
        <div>{dateFormat(m.release_date)}</div>
        <div>
          <div
            className={`score ${
              m.vote_average >= 7
                ? 'high'
                : m.vote_average >= 3 && m.vote_average < 7
                ? 'mid'
                : 'bad'
            }`}
          >
            {m.vote_average}
          </div>
        </div>
      </div>
    ));
  };

  useEffect(() => {}, []);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="w-100">
      {/* POSTER */}
      <div>
        <LazyLoad offsetVertical={300}>
          <img
            width="140"
            height="210"
            alt={data.name}
            src={`${
              data.profile_path
                ? 'http://image.tmdb.org/t/p/w342' + data.profile_path
                : poster.src
            }`}
          />
        </LazyLoad>
      </div>

      {/* BUTTONS */}
      <div>
        <h1>{data.name}</h1>
        <p>{data.biography}</p>
        <p>
          <small>Local de nascimento: {data.place_of_birth}</small>
          <br />
          <small>Data de aniversário: {data.birthday}</small>
        </p>
      </div>

      <div className="mb-10">
        <h3>Total: {movieCredits?.cast?.length ?? 0} itens</h3>
      </div>

      <div>
        <div className="person-movies-grid">
          <div>
            <b>Título</b>
          </div>
          <div>
            <b>Personagem</b>
          </div>
          <div>
            <b>Data</b>
          </div>
          <div>
            <b>Nota</b>
          </div>
        </div>
        {movieCredits?.cast?.length === 0 ? (
          <p>Não há conteúdo aqui.</p>
        ) : (
          mapMovies()
        )}
      </div>
    </section>
  );
}
