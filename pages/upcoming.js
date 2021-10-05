import Error from '../components/Error';
import Spinner from '../components/Spinner';
import useFetch from '../utils/useFetch';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import poster_default from '../assets/poster.png';
import Search from '../components/Search';
import Masonry from 'react-masonry-css';
import { breakpointColumnsObj } from '../utils/constants';

export default function Upcoming() {
  const [page, setPage] = useState(1);
  const [opacity, setOpacity] = useState(false);

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="flex-center">
      <div>
        <Search setOpacity={setOpacity}></Search>

        <h1 className="text-center">Em Breve</h1>
        <div className={`mb-20 ${opacity ? 'opacity-20' : ''}`}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data.results.map((m) => (
              <div key={m.id} className="movie-item mb-10">
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
                    <small>{m.original_title}</small>
                  </a>
                </Link>
              </div>
            ))}
          </Masonry>
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
            próxima
          </button>
        </div>
      </div>
    </section>
  );
}
