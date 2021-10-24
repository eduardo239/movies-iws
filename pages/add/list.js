/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useUser } from '../../utils/useUser';
import { breakpointColumnsObj2 } from '../../utils/constants';
import Message from '../../components/Message';
import searchIcon from '../../assets/eva_search-outline.svg';
import trashIcon from '../../assets/eva_trash-outlineb.svg';
import saveIcon from '../../assets/eva_save-outline.svg';
import addIcon from '../../assets/eva_plus-circle-outline.svg';
import closeIcon from '../../assets/eva_close-outline.svg';
import Masonry from 'react-masonry-css';
import ImageCard from '../../components/card/ImageCard';
import {
  handleAdd,
  handleRemove,
  handleSearch,
  handleSave,
} from '../../utils/list';

const List = () => {
  const { user } = useUser();

  const [name, setName] = useState('');
  const [term, setTerm] = useState('');
  const [message, setMessage] = useState(false);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState({
    movie: true,
    tv: false,
  });

  const handleReset = () => {
    setItems([]);
  };

  return (
    <section>
      <div>
        {/* form */}
        <form
          onSubmit={(e) => handleSearch(e, term, setData)}
          className="mb-20"
        >
          <div className="form-group w-100 mb-10">
            <label htmlFor="list-name">Nome da lista</label>
            <input
              type="text"
              id="list-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group mb-10">
            <label htmlFor="list-items">Filme</label>
            <input
              required
              type="text"
              id="list-items"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          <button
            onClick={(e) => handleSearch(e, term, setData)}
            className="btn-icon btn-primary w-100 flex-1"
          >
            <img src={searchIcon.src} alt="Search" width="24" height="24" />
            Buscar
          </button>
        </form>
      </div>
      {/* end A */}

      {/* b main */}
      <div className="grid-list">
        <div className="flex-start gap-10 mb-20">
          <Masonry
            breakpointCols={breakpointColumnsObj2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data?.results?.length > 0 &&
              data.results.map((x) => (
                <ImageCard key={x.id} content={x}>
                  <button
                    className="btn-icon btn-secondary w-100"
                    onClick={() => handleAdd(x, items, setItems)}
                  >
                    <img src={addIcon.src} alt="Add" /> Add
                  </button>
                </ImageCard>
              ))}
          </Masonry>
        </div>

        <aside>
          <div>
            {items.length > 0 && (
              <>
                <h2>Lista</h2>
                <hr />
                <p>Quantidade: {items.length}</p>
                <hr />
                <button
                  onClick={handleReset}
                  className="btn-icon btn-secondary w-100"
                >
                  <img
                    src={closeIcon.src}
                    alt="Delete"
                    width="24"
                    height="24"
                  />{' '}
                  limpar lista
                </button>
                <hr />
              </>
            )}

            {items.map((m) => (
              <div key={m.id}>
                <h6>
                  {m.original_title
                    ? m.original_title
                    : m.original_name
                    ? m.original_name
                    : `none`}
                </h6>
                <button
                  onClick={() => handleRemove(m, items, setItems)}
                  className="btn-icon btn-light w-100"
                >
                  <img
                    src={trashIcon.src}
                    alt="Delete"
                    width="24"
                    height="24"
                  />
                  remover
                </button>
                <hr />
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <>
              <div>
                <button
                  onClick={(e) =>
                    handleSave(e, name, items, user.id, setMessage)
                  }
                  className="btn-icon btn-primary w-100"
                >
                  <img src={saveIcon.src} alt="Save" width="24" height="24" />
                  Salvar
                </button>
              </div>
              <br />
              <div>
                {message && (
                  <Message type="success" message="Lista salva com sucesso." />
                )}
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
};

export default List;
