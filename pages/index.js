import { useState } from 'react';
import useFetch from '../utils/useFetch';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import Search from '../components/Search';
import Masonry from 'react-masonry-css';
import { breakpointColumnsObj } from '../utils/constants';
import ImageCardTrailer from '../components/card/ImageCardTrailer';
import { useUser } from '../utils/useUser';

export default function Home() {
  const [opacity, setOpacity] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR&sort_by=popularity.desc&page=${page}`
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section>
      <Search setOpacity={setOpacity}></Search>
      {/*  */}
      <h1 className="text-center">Filmes Populares</h1>
      {/*  */}
      <div className={`flex-center mb-20 ${opacity ? 'opacity-20' : ''}`}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data?.results.map((x) => (
            <ImageCardTrailer key={x.id} content={x}></ImageCardTrailer>
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
          próximo
        </button>
      </div>
    </section>
  );
}
