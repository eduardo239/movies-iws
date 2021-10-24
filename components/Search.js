import { useState } from 'react';
import ModalSearch from './ModalSearch';

export default function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.length > 1) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR&query=${search}&page=1&include_adult=false`
      );
      const data = await res.json();
      setResults(data.results);
      if (results.length > 0) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    } else {
      setShowModal(false);
      setResults([]);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearch('');
    setShowModal(false);
    setResults([]);
  };

  return (
    <div className="search">
      <form onChange={handleSubmit} className="flex-center">
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <div className="form-group">
            <label htmlFor="login-email">Busca</label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleReset}>
            x
          </button>
        </div>
      </form>
      <div className="search-result">
        <ModalSearch
          show={showModal}
          toggleModal={toggleModal}
          data={results}
        ></ModalSearch>
      </div>
    </div>
  );
}
