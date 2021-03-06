import { useState } from 'react';
import { useRouter } from 'next/router';
import { dateFormat, spliceString } from '../../utils';
/* eslint-disable @next/next/no-img-element */
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import useFetch from '../../utils/useFetch';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import Placeholder from '../../components/Placeholder';
import likeIcon from '../../assets/eva_heart-outline.svg';

export default function Person() {
  const router = useRouter();

  const { id } = router.query;
  const [seeMore, setSeeMore] = useState(false);
  const [seeMoreString, setSeeMoreString] = useState('Ler Mais');

  const { data, isLoading, isError } = useFetch(
    id
      ? `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
      : ''
  );

  const { data: movieCredits } = useFetch(
    id
      ? `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
      : ''
  );

  const showMore = () => {
    setSeeMore(!seeMore);
    if (seeMore) {
      setSeeMoreString('Ler Mais');
    } else {
      setSeeMoreString('Ler Menos');
    }
  };

  const mapMovies = () => {
    return movieCredits?.cast?.map((content) => (
      <div key={content.credit_id} className="person-movies-grid">
        <Link href={`/movie/${content.id}`} passHref>
          <a className="person-movies-grid__link">
            <span className="person-movies-grid__show-image">
              {content.title}
              <img
                className="person-movies-grid__on-hover_show"
                src={`${
                  content.poster_path
                    ? 'http://image.tmdb.org/t/p/w185' + content.poster_path
                    : ''
                }`}
                alt={
                  content.original_title
                    ? content.original_title
                    : content.original_name
                    ? content.original_name
                    : `none`
                }
              />
            </span>
          </a>
        </Link>

        <div>{content.character}</div>

        <div>{dateFormat(content.release_date)}</div>

        <div>
          <div
            className={`score ${
              content.vote_average >= 7
                ? 'high'
                : content.vote_average >= 3 && content.vote_average < 7
                ? 'mid'
                : 'bad'
            }`}
          >
            {content.vote_average}
          </div>
        </div>
      </div>
    ));
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="w-100">
      {/* POSTER */}
      <div className="flex-start gap-10">
        <LazyLoad offset={100} height={210} once placeholder={<Placeholder />}>
          <img
            width="140"
            height="210"
            alt={data.name}
            src={`${
              data.profile_path
                ? 'http://image.tmdb.org/t/p/w342' + data.profile_path
                : ''
            }`}
          />
        </LazyLoad>
        <div>
          <button className="btn-icon btn-primary">
            <img src={likeIcon.src} alt="Add" /> Seguir
          </button>
        </div>
      </div>

      {/* BUTTONS */}
      <div>
        <h1>{data.name}</h1>

        {!seeMore ? (
          <p>{spliceString(data.biography, 500)}</p>
        ) : (
          <p>{data.biography}</p>
        )}
        {data.biography.length > 499 && (
          <button className="btn-small btn-secondary mb-10" onClick={showMore}>
            {seeMoreString}
          </button>
        )}

        <p>
          <small>Local de nascimento: {data.place_of_birth}</small>
          <br />
          <small>Data de anivers??rio: {data.birthday}</small>
        </p>
      </div>

      <div className="mb-10">
        <h3>Total: {movieCredits?.cast?.length ?? 0} itens</h3>
      </div>

      <div>
        <div className="person-movies-grid">
          <div>
            <b>T??tulo</b>
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
          <p>N??o h?? conte??do aqui.</p>
        ) : (
          mapMovies()
        )}
      </div>
    </section>
  );
}
