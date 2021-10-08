import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import useFetch from '../../utils/useFetch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/useUser';
import { addMovieTo, removeMovieFrom } from '../../utils';
import { useEffect, useState } from 'react';
import video from '../../assets/video.png';
import star from '../../assets/star.png';
import eye from '../../assets/eva_eye-outline.svg';
import calendar from '../../assets/eva_calendar-outline.svg';
import poster_default from '../../assets/poster.png';
import Modal from '../../components/Modal';
import LazyLoad from 'react-lazy-load';
import Masonry from 'react-masonry-css';
import { breakpointColumnsObj } from '../../utils/constants';
import ImageCard from '../../components/ImageCard';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const { user, profile } = useUser();
  const [message, setMessage] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const [videoList, setVideosList] = useState([]);
  const [similarList, setSimilarList] = useState([]);
  const [starList, setStarList] = useState([]);

  const [alreadyOnTheList, setAlreadyOnTheList] = useState({
    moviesWatched: false,
    moviesToSee: false,
  });

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
  );

  const { data: videos } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
  );

  const { data: stars } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
  );

  const { data: similar } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
  );

  useEffect(() => {
    if (videos?.results?.length > 0) setVideosList(videos.results);
    if (stars?.cast?.length > 0) setStarList(stars.cast);
    if (similar?.results?.length > 0) setSimilarList(similar.results);
  }, [videos, stars, similar, profile]);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const addMovie = async (action) => {
    // TODO: mensagem quando se o item está na lista
    const response = await addMovieTo(action, user.id, data);

    if (response) {
      setMessage({
        show: true,
        message: 'Item adicionado com sucesso.',
        type: 'success',
      });
    } else {
      setMessage({
        show: true,
        message: 'Houve um erro ao adicionar o item.',
        type: 'alert',
      });
    }
    setTimeout(() => {
      setMessage({ show: false, message: '', type: 'success' });
    }, 2000);
  };

  const removeMovie = async (action) => {
    // TODO: mensagem quando se o item está na lista
    const response = await removeMovieFrom(action, user.id, data);

    if (response) {
      setMessage({
        show: true,
        message: 'Item adicionado com sucesso.',
        type: 'success',
      });
    } else {
      setMessage({
        show: true,
        message: 'Houve um erro ao adicionar o item.',
        type: 'alert',
      });
    }
    setTimeout(() => {
      setMessage({ show: false, message: '', type: 'success' });
    }, 2000);
  };

  return (
    <section>
      {message.show && <Modal message={message.message} type={message.type} />}
      <div className="movie-grid">
        {/* POSTER */}
        <div className="movie-grid__a">
          <LazyLoad offsetVertical={300}>
            <img
              width="261"
              height="386"
              alt={data.original_title}
              src={`${
                data.poster_path
                  ? 'http://image.tmdb.org/t/p/w342' + data.poster_path
                  : poster_default.src
              }`}
            />
          </LazyLoad>
        </div>

        {/* TRAILER */}
        <div className="movie-grid__b video-container">
          {videos?.results?.length > 0 ? (
            <iframe
              width="684"
              height="386"
              src={`//www.youtube.com/embed/${videos.results[0].key}?rel=0`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <LazyLoad offsetVertical={300}>
              <img src={video.src} alt="Trailer" width="684" height="386" />
            </LazyLoad>
          )}
        </div>

        {/* BUTTONS */}
        <div className="movie-grid__c">
          <div className="movie-grid__buttons w-100 gap-5">
            {!alreadyOnTheList.moviesWatched ? (
              <button
                onClick={() => addMovie(0)}
                className={`btn-icon mw-100 ${'btn-primary'}`}
              >
                <img src={eye.src} alt="See" width="24" height="24" /> Já vi
              </button>
            ) : (
              <button
                onClick={() => removeMovie(0)}
                className={`btn-icon mw-100 ${'btn-secondary'}`}
              >
                <img src={eye.src} alt="See" width="24" height="24" /> Remover
              </button>
            )}

            {!alreadyOnTheList.moviesToSee ? (
              <button
                onClick={() => addMovie(1)}
                className={`btn-icon ${'btn-primary'}`}
              >
                <img src={calendar.src} alt="Calendar" width="24" height="24" />
                Vou ver
              </button>
            ) : (
              <button
                onClick={() => removeMovie(1)}
                className={`btn-icon w-100 ${'btn-secondary'}`}
              >
                <img src={calendar.src} alt="Calendar" width="24" height="24" />
                Remover
              </button>
            )}
          </div>
        </div>
      </div>
      {/* primeira linha */}

      {/* TITLE */}
      <div className="mb-10">
        <h1 className="mb-1">{data.title}</h1>
        <small>
          {data?.release_date?.split('-')[0]} - {data?.runtime} min
        </small>
      </div>

      {/* TAGS */}
      <div className="mb-20 tags">
        {data.genres
          ? data.genres.map((g) => (
              <small className="mr-5" key={g.id}>
                {g.name}
              </small>
            ))
          : ''}
      </div>

      {/* PLOT */}
      <div className="mb-20">
        <p>{data.overview}</p>
      </div>

      <hr />

      {/* CAST */}
      <h3 className="mb-10">Cast</h3>
      <div className="mb-20 flex-start cast">
        {starList.length > 0 &&
          starList.slice(0, 5).map((p) => (
            <div key={p.id}>
              <Link href={`/person/${p.id}`} passHref>
                <a>
                  <LazyLoad offsetVertical={300}>
                    <img
                      src={`${
                        p.profile_path
                          ? `http://image.tmdb.org/t/p/w342${p.profile_path}`
                          : star.src
                      }`}
                      alt={p.original_name}
                      width="140"
                      height="210"
                    />
                  </LazyLoad>
                </a>
              </Link>
              <p className="p-small">{p.original_name}</p>
            </div>
          ))}
      </div>

      <hr />

      {/* INFO */}
      <h3 className="mb-10">Info</h3>
      <div className="mb-20 info">
        <p className="mb-5">
          <b>Título: </b> {data?.title}
        </p>
        <p className="mb-5">
          <b>Título Original: </b> {data?.original_title}
        </p>
        <p className="mb-5">
          <b>Homepage: </b> {data?.homepage}
        </p>
        <p className="mb-5">
          <b>País de produção: </b>{' '}
          {data?.production_countries?.map((p) => (
            <span className="mr-5" key={p.name}>
              {p.name + ','}
            </span>
          ))}
        </p>
        <p className="mb-5">
          <b>Original language: </b> {data?.original_language}
        </p>
        <p className="mb-5">
          <b>Duração: </b> {data?.runtime} min
        </p>
        <p className="mb-5">
          <b>Status: </b> {data?.status}
        </p>
        <p className="mb-5">
          <b>Média dos votos: </b> {data?.vote_average}
        </p>
      </div>

      {/* TODO: videos */}
      {videoList.length > 1 && (
        <>
          <hr />
          <h3 className="mb-10 text-center">Mais Vídeos</h3>
          {videoList.length > 1 && (
            <div className="flex-center gap-10 mb-20">
              {videoList.slice(1, 3).map((v) => (
                <iframe
                  key={Math.random()}
                  width="456"
                  height="234"
                  src={`//www.youtube.com/embed/${v.key}?rel=0`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          )}
        </>
      )}

      {similarList.length > 0 && (
        <>
          <hr />

          <h3 className="mb-10 text-center">Outros Filmes</h3>
          <div className="flex-center">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {similarList.slice(0, 5).map((x) => (
                <Link key={x.id} href={`/movie/${x.id}`} passHref>
                  <a>
                    <LazyLoad offsetVertical={300}>
                      <ImageCard
                        image={`${
                          x.poster_path
                            ? 'http://image.tmdb.org/t/p/w185' + x.poster_path
                            : poster_default.src
                        }`}
                        alt={x.original_title}
                        title={x.original_title}
                        poster_default={poster_default}
                      />
                    </LazyLoad>
                  </a>
                </Link>
              ))}
            </Masonry>
          </div>
        </>
      )}
    </section>
  );
}
