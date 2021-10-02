import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import useFetch from '../../utils/useFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/useUser';
import { dateFormat } from '../../utils';
import { useEffect } from 'react';
import poster from '../../assets/poster.png';

export default function Person() {
  const router = useRouter();
  const { id } = router.query;
  // const { user, profile } = useUser();

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );

  const { data: movieCredits } = useFetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );

  const mapMovies = () => {
    return movieCredits?.cast?.map((m) => (
      <div key={m.credit_id} className="person-movies-grid">
        <Link href={`/movie/${m.id}`} passHref>
          <a>{m.title}</a>
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
        <Image
          width="148"
          height="222"
          alt={data.name}
          src={`${
            data.profile_path
              ? 'http://image.tmdb.org/t/p/w342' + data.profile_path
              : poster.src
          }`}
        />
      </div>

      {/* BUTTONS */}
      <div>
        <h1>{data.name}</h1>
        <p>{data.biography}</p>
        <p>{data.place_of_birth}</p>
        <p>
          <small>{data.birthday}</small>
        </p>
      </div>

      <div className="mb-10">
        <h3>Total: {movieCredits?.cast?.length ?? 0} itens</h3>
      </div>

      <div>
        {movieCredits?.cast?.length === 0 ? (
          <p>Não há conteúdo aqui.</p>
        ) : (
          mapMovies()
        )}
      </div>
    </section>
  );
}
