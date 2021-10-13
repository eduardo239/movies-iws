import { useState } from 'react';
import { breakpointColumnsObj } from '../utils/constants';
import useFetch from '../utils/useFetch';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import Search from '../components/Search';
import Masonry from 'react-masonry-css';
import ImageCardTrailer from '../components/ImageCardTrailer';

export default function Upcoming() {
  const [page, setPage] = useState(1);
  const [opacity, setOpacity] = useState(false);
  const [trailerModal, setTrailerModal] = useState(false);

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR&sort_by=popularity.desc&page=${page}`
  );

  const showTrailer = (id) => {
    console.log(id);
    setTrailerModal(!trailerModal);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section>
      <Search setOpacity={setOpacity}></Search>
      <h1 className="text-center">Em Breve</h1>
      <div className={`flex-center mb-20 ${opacity ? 'opacity-20' : ''}`}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.results.map((x) => (
            <ImageCardTrailer
              key={x.id}
              showTrailer={showTrailer}
              content={x}
            />
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
    </section>
  );
}
