import { useState } from 'react';
import ModalSearch from './ModalSearch';

export default function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [modal, toggleModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // fetch movie by term
  const fetchMovies = async (term) => {
    setSearch(term);
    if (search.length > 1) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR&page=1&include_adult=false&query=${search}`;

      const response = await fetch(url);
      const json = await response.json();
      setResults(json);
      toggleModal(true);
    } else if (search.length <= 1) {
      setResults([]);
      toggleModal(false);
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="login-email">Busca</label>
          <input
            required
            type="text"
            id="search"
            value={search}
            onChange={(e) => fetchMovies(e.target.value)}
          />
        </div>
      </form>
      <div className="search-result">
        <ModalSearch
          shown={modal}
          data={results}
          close={() => {
            toggleModal(false);
          }}
        ></ModalSearch>
      </div>
    </div>
  );
}
