/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import useFetch from '../utils/useFetch';
import Link from 'next/link';
import Spinner from './Spinner';
import Error from './Error';
import poster_default from '../assets/poster.png';
import LazyLoad from 'react-lazyload';

export default function Search({ setOpacity }) {
  const [term, setTerm] = useState('');
  const [items, setItems] = useState([]);

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR&page=1&include_adult=false&query=${term}`
  );

  const handleClear = () => {
    setTerm('');
  };

  useEffect(() => {
    if (data?.results?.length > 0) setItems(data.results);

    if (term.length > 1) {
      setOpacity(true);
    } else {
      setOpacity(false);
    }
  }, [term, data, setOpacity]);

  if (isError) return <Error />;
  return (
    <section>
      <form className="search-field">
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="login-email">Search</label>
          <input
            type="text"
            id="search-input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        {term.length > 0 && (
          <button className="btn btn-secondary" onClick={handleClear}>
            Limpar Busca
          </button>
        )}
      </form>

      {isLoading ? (
        <div className="search-result">
          <Spinner />
        </div>
      ) : (
        <div
          className={`flex-center gap-10 ${term.length > 0 && 'search-result'}`}
        >
          {items.length > 0 &&
            term.length > 0 &&
            items.slice(0, 5).map((m) => (
              <div key={m.id} className="movie-item">
                <Link href={`/movie/${m.id}`} passHref>
                  <a>
                    <LazyLoad offsetVertical={300}>
                      <img
                        width="140"
                        height="210"
                        alt={m.original_title}
                        src={`${
                          m.poster_path
                            ? 'http://image.tmdb.org/t/p/w185' + m.poster_path
                            : poster_default.src
                        }`}
                      />
                    </LazyLoad>
                    <small>{m.original_title}</small>
                  </a>
                </Link>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
