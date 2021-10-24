/* eslint-disable @next/next/no-img-element */
import { breakpointColumnsObj } from '../../utils/constants';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/useUser';
import { addMovieTo, checkIfContain, removeMovieFrom } from '../../utils';
import { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import useFetch from '../../utils/useFetch';
import Link from 'next/link';
import video from '../../assets/video.png';
import poster_default from '../../assets/poster.png';
import ModalMessage from '../../components/ModalMessage';
import LazyLoad from 'react-lazyload';
import Masonry from 'react-masonry-css';
import ImageCardTrailer from '../../components/card/ImageCardTrailer';
import AddRemoveButtons from '../../components/AddRemoveButtons';
import MovieTrailer from '../../components/MovieTrailer';
import loginIcon from '../../assets/eva_log-in-outline.svg';
import Person from '../../components/card/Person';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const { user, profile, updateProfile } = useUser();
  const [message, setMessage] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const [videoList, setVideosList] = useState([]);
  const [similarList, setSimilarList] = useState([]);
  const [starList, setStarList] = useState([]);

  const [toSeeOK, setToSeeOK] = useState(false);
  const [watchedOK, setWatchedOK] = useState(false);

  const { data, isLoading, isError } = useFetch(
    id
      ? `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
      : ''
  );

  const { data: videos } = useFetch(
    id
      ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
      : ''
  );

  const { data: stars } = useFetch(
    id
      ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
      : ''
  );

  const { data: similar } = useFetch(
    id
      ? `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
      : ''
  );

  useEffect(() => {
    if (videos?.results?.length > 0) setVideosList(videos.results);
    if (stars?.cast?.length > 0) setStarList(stars.cast);
    if (similar?.results?.length > 0) setSimilarList(similar.results);

    (async function () {
      if (id && profile) {
        const res = await checkIfContain(profile?.user_id, id);

        setToSeeOK(res.toSeeOK);
        setWatchedOK(res.watchedOK);
      }
    })();
    return () => {
      setVideosList([]);
      setSimilarList([]);
      setStarList([]);
    };
  }, [videos, stars, similar, profile, id]);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const addMovie = async (action) => {
    const response = await addMovieTo(action, user.id, data);
    if (action === 0) setWatchedOK(!watchedOK);
    if (action === 1) setToSeeOK(!toSeeOK);

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
    updateProfile();
    setTimeout(() => {
      setMessage({ show: false, message: '', type: 'success' });
    }, 2000);
  };

  const removeMovie = async (action) => {
    const response = await removeMovieFrom(action, user.id, data);
    if (action === 0) setWatchedOK(!watchedOK);
    if (action === 1) setToSeeOK(!toSeeOK);

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
    updateProfile();
    setTimeout(() => {
      setMessage({ show: false, message: '', type: 'success' });
    }, 2000);
  };

  return (
    <section>
      {message.show && (
        <ModalMessage message={message.message} type={message.type} />
      )}
      <div className="movie-grid">
        {/* POSTER */}
        <div className="movie-grid__a">
          <LazyLoad>
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
            <MovieTrailer trailer_id={videos.results[0].key} />
          ) : (
            <LazyLoad>
              <img src={video.src} alt="Trailer" width="684" height="386" />
            </LazyLoad>
          )}
        </div>

        {/* BUTTONS */}
        {user ? (
          <div className="movie-grid__c">
            <div className="movie-grid__buttons w-100 gap-5">
              <AddRemoveButtons
                addMovie={addMovie}
                removeMovie={removeMovie}
                watchedOK={watchedOK}
                toSeeOK={toSeeOK}
              />
            </div>
          </div>
        ) : (
          <div className="movie-grid__c p-5">
            <Error
              type="warning"
              message="É necessário fazer o login para adicionar o filme a sua lista."
            />
            <Link href="/login" passHref>
              <button className="btn-icon btn-primary">
                <img src={loginIcon.src} alt="Login" width="24" height="24" />{' '}
                <span>Entrar</span>
              </button>
            </Link>
          </div>
        )}
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
              <small className="mr-5 mb-5" key={g.id}>
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
          starList.slice(0, 5).map((x) => <Person data={x} key={x.id} />)}
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
                <ImageCardTrailer key={x.id} content={x} />
              ))}
            </Masonry>
          </div>
        </>
      )}
    </section>
  );
}
