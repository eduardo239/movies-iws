import Error from '../components/Error';
import Spinner from '../components/Spinner';
import useFetch from '../utils/useFetch';
import Image from 'next/image';
import Link from 'next/link';
import Search from '../components/Search';
import { useState } from 'react';
import poster_default from '../assets/poster.png';

export default function Home({}) {
  const [opacity, setOpacity] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="flex-center">
      <div>
        <Search setOpacity={setOpacity}></Search>
        <h1 className="text-center">Filmes Populares</h1>
        <div
          className={`flex-center gap-10 mb-20 ${opacity ? 'opacity-20' : ''}`}
        >
          {data.results.map((m) => (
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
        <div className="flex-center gap-10 mb-20">
          <button
            className="btn btn-300"
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || page < 1}
          >
            anterior
          </button>
          <button className="btn btn-300" onClick={() => setPage(page + 1)}>
            próximo
          </button>
        </div>
      </div>
    </section>
  );
}
