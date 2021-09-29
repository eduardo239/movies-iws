import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import useFetch from '../../utils/useFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/useUser';
import { supabase } from '../../utils/supabase';
import { containsObjectId } from '../../utils';
import { useEffect, useState } from 'react';
import Message from '../../components/Message';
import poster from '../../assets/poster.png';
import video from '../../assets/v.png';
import thumb from '../../assets/b.png';
import star from '../../assets/star.png';
import eye from '../../assets/bi_eye.svg';
import calendar from '../../assets/bi_calendar.svg';
import poster_default from '../../assets/poster.png';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const { user, profile } = useUser();
  const [message, setMessage] = useState(false);
  const [videoList, setVideosList] = useState([]);
  const [similarList, setSimilarList] = useState([]);
  const [starList, setStarList] = useState([]);

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );

  const { data: videos } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );

  const { data: stars } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );

  const { data: similar } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US`
  );

  useEffect(() => {
    //videos?.results?.length
    if (videos?.results?.length > 0) setVideosList(videos.results);
    if (stars?.cast?.length > 0) setStarList(stars.cast);
    if (similar?.results?.length > 0) setSimilarList(similar.results);
  }, [videos, stars, similar]);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const addMovie = async (action) => {
    if (action === 0) {
      // busca os filmes já vistos pelo usuário
      let { data: p, error } = await supabase
        .from('profiles')
        .select('movies_watched')
        .eq('user_id', user.id);

      // verifica se já está na lista
      const array = p[0]?.movies_watched ?? [];
      const watched = containsObjectId(data.id, array);
      const newArray = [...array, data];

      // se não, insere
      if (!watched) {
        const body = { movies_watched: newArray };
        const { data, error } = await supabase
          .from('profiles')
          .update([body])
          .eq('user_id', user.id);
        if (error) alert('erro !watched');
        setMessage(true);
        setTimeout(() => setMessage(false), 2000);
      } else {
        alert('ja tem esse filme');
      }
    } else if (action == 1) {
      // busca os filmes já está na lista do usuário
      let { data: s, error } = await supabase
        .from('profiles')
        .select('movies_to_see')
        .eq('user_id', user.id);

      // verifica se já está na lista
      const array = s[0]?.movies_to_see ?? [];
      const to_see = containsObjectId(data.id, array);
      const newArray = [...array, data];

      // se não, insere
      if (!to_see) {
        const body = { movies_to_see: newArray };
        const { data, error } = await supabase.from('profiles').update([body]);
        if (error) alert('erro !to_see');
        setMessage(true);
        setTimeout(() => setMessage(false), 2000);
      } else {
        alert('ja tem esse filme');
      }
    }
  };

  console.log(`videoList`);
  console.log(videoList);

  return (
    <section>
      {message && (
        <Message type="success" message="Item adicionado com sucesso." />
      )}
      <div className="movie-grid">
        <div>
          <Image
            width="261"
            height="386"
            alt={data.original_title}
            src={`${
              data.poster_path
                ? 'http://image.tmdb.org/t/p/w342' + data.poster_path
                : poster.src
            }`}
          />
        </div>

        <div style={{ minWidth: `684px` }}>
          {videos?.results?.length > 0 && (
            <iframe
              width="684"
              height="386"
              src={`//www.youtube.com/embed/${videos.results[0].key}?rel=0`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="movie-grid-buttons">
          <button
            onClick={() => addMovie(0)}
            className={`btn-icon ${'btn-primary'}`}
          >
            <Image src={eye.src} alt="See" width="16" height="16" /> Já vi
          </button>

          <button
            onClick={() => addMovie(1)}
            className={`btn-icon ${'btn-primary'}`}
          >
            <Image src={calendar.src} alt="Calendar" width="16" height="16" />
            Vou ver
          </button>
        </div>
      </div>
      {/* primeira linha */}

      <div className="mb-10">
        <h1 className="mb-1">{data.original_title}</h1>
        <small>2021 - PG-13 - 1h 55min</small>
      </div>

      <div className="mb-20 tags">
        {data.genres
          ? data.genres.map((g) => (
              <small className="mr-5" key={g.id}>
                {g.name}
              </small>
            ))
          : ''}
      </div>

      <div className="mb-20">
        <p>{data.overview}</p>
      </div>

      <hr />

      <h3 className="mb-10">Cast</h3>
      <div className="mb-20 flex-start " style={{ gap: '1rem' }}>
        {starList.length > 0 &&
          starList.slice(0, 5).map((c) => (
            <div key={c.id}>
              <Image
                src={`${
                  c.profile_path
                    ? `http://image.tmdb.org/t/p/w342${c.profile_path}`
                    : star.src
                }`}
                alt={c.original_name}
                width="148"
                height="222"
              />
              <p className="p-small">{c.original_name}</p>
            </div>
          ))}
      </div>

      <hr />
      <div className="mb-20">
        <p className="mb-5">
          <b>Homepage: </b> {data?.homepage}
        </p>
        <p className="mb-5">
          <b>País de produção: </b>{' '}
          {data?.production_countries?.map((p) => (
            <span className="mr-5" key={p}>
              {p.name + ','}
            </span>
          ))}
        </p>
        <p className="mb-5">
          <b>Status: </b> {data?.status}
        </p>
        <p className="mb-5">
          <b>Vote average: </b> {data?.vote_average}
        </p>
      </div>

      {videoList.length > 1 && (
        <>
          <hr />
          <h3 className="mb-10 text-center">Mais Vídeos</h3>
          {videoList.length > 1 && (
            <div className="flex-center gap-10 mb-20">
              <div className="videos-grid">
                {videoList.slice(1, 3).map((v) => (
                  <iframe
                    key={v.id}
                    width="456"
                    height="234"
                    src={`//www.youtube.com/embed/${v.key}?rel=0`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {similarList.length > 0 && (
        <>
          <hr />

          <h3 className="mb-5 text-center">Outros Filmes</h3>
          <div
            className="videos-grid"
            style={{ gap: '1rem', justifyContent: 'center' }}
          >
            {similarList.slice(0, 6).map((m) => (
              <div key={m.id} className="movie-item">
                <Link href={`/movie/${m.id}`} passHref>
                  <a>
                    <Image
                      width="140"
                      height="210"
                      alt={m.original_title}
                      src={`${
                        m.poster_path
                          ? 'http://image.tmdb.org/t/p/w185' + m.poster_path
                          : poster_default.src
                      }`}
                    />
                    <span>{m.original_title}</span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
