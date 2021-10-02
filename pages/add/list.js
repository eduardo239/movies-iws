import { useState } from 'react';
import { useUser } from '../../utils/useUser';
import { supabase } from '../../utils/supabase';
import { containsObjectId } from '../../utils';
import Image from 'next/image';
import Link from 'next/link';
import Message from '../../components/Message';
import poster_default from '../../assets/poster.png';
import searchIcon from '../../assets/eva_search-outline.svg';
import trashIcon from '../../assets/eva_trash-outlineb.svg';
import saveIcon from '../../assets/eva_save-outline.svg';
import closeIcon from '../../assets/eva_close-outline.svg';
import Masonry from 'react-masonry-css';

const List = () => {
  const { user } = useUser();

  const [name, setName] = useState('');
  const [term, setTerm] = useState('');
  const [message, setMessage] = useState(false);

  const [options, setOptions] = useState({
    movie: true,
    tv: false,
  }); // multi, tv, person, keyword

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  const handleAdd = async (m) => {
    // verifica se já está na lista
    const contain = containsObjectId(m.id, items);

    if (contain) {
      alert('Já tem esse item na lista.');
      return;
    } else {
      setItems([...items, m]);
    }
  };

  const handleRemove = (m) => {
    const contain = containsObjectId(m.id, items);

    if (!contain) {
      alert('Esse filme não está na lista.');
      return;
    } else {
      let array = items.filter((x) => x.id !== m.id);
      setItems(array);
    }
  };

  const handleSave = async () => {
    // verifica se a lista tem nome
    if (!name) {
      alert('A lista não tem nome.');
      return;
    }
    if (items.length === 0) {
      // Verifica se a lista está vazia
      alert('A lista esta vazia');
    } else {
      // cria o objeto para inserir os dados na tabela lists
      const body = {
        user_id: user.id,
        listname: name,
        items,
      };

      // insere os dados na tabela
      const { data: listsData, error: listsDataError } = await supabase
        .from('lists')
        .insert([body])
        .eq('user_id', user.id)
        .single();

      if (listsDataError) alert(`listsDataError`);
      if (data) {
        // pega o id da nova linha da tabela lists
        const newListId = listsData.id;

        // pega as listas do profile
        const { data: profileLists, error: profileListsError } = await supabase
          .from('profiles')
          .select('lists')
          .eq('user_id', user.id);



        if (profileListsError) {
          alert(`profileListsError`);
          return;
        }
        let newArray = [];

        // FIXME:
        if (profileLists.lists !== null && profileLists[0].lists.length === 0) {
          newArray = [newListId];

        } else {
          // adicionar o novo item nas listas
          newArray = [...profileLists.lists, newListId];

        }



        // atualiza o profile com a nova array
        const { data, error } = await supabase
          .from('profiles')
          .update({ lists: newArray })
          .eq('user_id', user.id);

        if (error) alert(error);
        setMessage(true);
        setTimeout(() => setMessage(false), 2000);
      }
    }
  };

  const handleReset = () => {
    setItems([]);
  };

  const search = async (e) => {
    e.preventDefault();

    const adult = false;
    const page = 1;

    const t = options.movie
      ? 'movie'
      : options.tv
      ? 'tv'
      : options.tv && options.movie
      ? 'multi'
      : 'movie';

    const url = `https://api.themoviedb.org/3/search/${t}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=${page}&include_adult=${adult}&query=${term}`;

    let response = await fetch(url);

    if (response.status === 200) {
      let json = await response.json();
      if (json) setData(json);
    } else {
      alert('Erro na busca');
    }
  };

  return (
    <section className="w-100">
      {/* a left top */}
      <div className="flex-start gap-10 w-100 mb-20">
        <div className="flex-1 mr-10">
          <form onSubmit={search} className="new-list">
            <div className="form-group w-100">
              <label htmlFor="list-items">Nome do Item</label>
              <input
                required
                type="text"
                id="list-items"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>

            <div className="flex-center w-100">
              <div className="form-group-checkbox flex-1 mr-10">
                <input
                  id="lists-search-movies"
                  type="checkbox"
                  defaultChecked={options.movie}
                  onChange={() =>
                    setOptions({
                      movie: !options.movie,
                      tv: options.tv,
                    })
                  }
                />
                <label htmlFor="lists-search-movies">Movies</label>
              </div>

              <div className="form-group-checkbox flex-1 mr-10">
                <input
                  id="lists-search-tvs"
                  type="checkbox"
                  defaultChecked={options.tv}
                  onChange={() =>
                    setOptions({
                      movie: options.movie,
                      tv: !options.tv,
                    })
                  }
                />
                <label htmlFor="lists-search-tvs">TV</label>
              </div>

              <button
                onClick={search}
                className="btn-icon btn-primary w-100 flex-1"
              >
                <Image
                  src={searchIcon.src}
                  alt="Search"
                  width="24"
                  height="24"
                />
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* b right top */}
        <div className="flex-1">
          <div className="form-group w-100 mb-10">
            <label htmlFor="list-name">Nome da lista</label>
            <input
              type="text"
              id="list-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <p>Lista: {name}</p>
          <hr />
          <p>Quantidade de items: {items.length}</p>
          <hr />
        </div>
      </div>

      {/* c main left bottom */}
      <section className="flex-start">
        <main className="mr-10">
          {data.results?.length > 0 && (
            <div className="flex-start">
              <div className="flex-center gap-10 mb-20">
                <Masonry
                  breakpointCols={5}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {data.results.map((m) => (
                    <div key={m.id} className="movie-item ">
                      <Link
                        href={`/${m.original_title ? 'movie' : 'tv'}/${m.id}`}
                        passHref
                      >
                        <a className="mb-20">
                          <Image
                            width="140"
                            height="210"
                            alt={
                              m.original_title
                                ? m.original_title
                                : m.original_name
                                ? m.original_name
                                : `none`
                            }
                            src={`${
                              m.poster_path
                                ? 'http://image.tmdb.org/t/p/w185' +
                                  m.poster_path
                                : poster_default.src
                            }`}
                          />

                          {m.original_title
                            ? m.original_title
                            : m.original_name
                            ? m.original_name
                            : `none`}
                        </a>
                      </Link>

                      <p className="small">
                        {m.release_date
                          ? m.release_date
                          : m.first_air_date
                          ? m.first_air_date
                          : 'none'}
                      </p>
                      <button
                        onClick={() => handleAdd(m)}
                        className="btn-small w-100 btn-primary"
                      >
                        adicionar
                      </button>
                    </div>
                  ))}
                </Masonry>
              </div>
            </div>
          )}
        </main>

        <aside>
          <div>
            {items.length > 0 && (
              <div>
                {items.length > 0 && (
                  <>
                    <button
                      onClick={handleReset}
                      className="btn-icon btn-secondary w-100"
                    >
                      <Image
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
                      onClick={() => handleRemove(m)}
                      className="btn-icon btn-light w-100"
                    >
                      <Image
                        src={trashIcon.src}
                        alt="Delete"
                        width="24"
                        height="24"
                      />{' '}
                      remover
                    </button>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <>
              <div>
                <button
                  onClick={handleSave}
                  className="btn-icon btn-primary w-100"
                >
                  <Image src={saveIcon.src} alt="Save" width="24" height="24" />
                  Salvar
                </button>
              </div>
              <br />
              {/* TODO: margin bottom */}
              <div>
                {message && (
                  <Message type="success" message="Lista salva com sucesso." />
                )}
              </div>
            </>
          )}
        </aside>
      </section>
    </section>
  );
};

export default List;
