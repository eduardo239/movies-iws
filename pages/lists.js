/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { dateFormat } from '../utils';
import Link from 'next/link';
import list_poster_default from '../assets/fig1.png';
import list from '../assets/eva_list-outline.svg';
import LazyLoad from 'react-lazyload';
import poster_default from '../assets/poster.png';
import { useUser } from '../utils/useUser';
import { handleDelete } from '../utils/list';

const Lists = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [endLoadMore, setEndLoadMore] = useState(false);
  const { user } = useUser();

  const loadMore = async () => {
    if (!endLoadMore) {
      let { data: lists, error } = await supabase
        .from('lists')
        .select('*')
        .range(page * limit, page * limit * 2)
        .order('inserted_at', { ascending: false });

      if (lists?.length <= 10) {
        let arr = lists.splice(-1, 1);
        // bug

        setItems([...items, ...arr]);
        setEndLoadMore(true);
      } else {
        setItems([...items, ...lists]);
        setPage(page + 1);
      }
    }
  };

  const deleteList = async (id) => {
    if (user) {
      handleDelete(id, user.id);
      setItems(items.filter((item) => item.id !== id));
    } else {
      alert('Usuário não está logado');
    }
  };

  useEffect(() => {
    (async function () {
      let { data: lists, error } = await supabase
        .from('lists')
        .select('*')
        .limit(10)
        .order('inserted_at', { ascending: false });
      if (lists && !error) {
        if (lists.length > 0) setItems(lists);
      }
    })();
  }, []);

  return (
    <section className="w-100">
      <h1>Listas</h1>
      <div className="mb-10">
        <p>
          As listas do Site são a melhor maneira de organizar os seus filmes e
          séries favoritos por assunto ou interesse. Compartilhe com seus amigos
          e outros usuários.
        </p>
        <Link href={`/add/list`} passHref>
          <a className="btn-icon btn-primary">
            <img src={list.src} alt="See" width="24" height="24" /> Criar Lista
          </a>
        </Link>
      </div>

      <hr />

      <div>
        <small>
          Descrição, usuário, quantidade de items, likes e comentários.
        </small>
        <h1>Listas dos Usuários</h1>
      </div>

      <div>
        {items.length > 0 ? (
          items.map((m) => (
            <section key={m.id} className="list-items">
              <LazyLoad height={40} once placeholder={poster_default.src}>
                <div style={{ height: '40px', overflow: 'hidden' }}>
                  <img
                    src={`${
                      m.poster
                        ? 'http://image.tmdb.org/t/p/w185' + m.poster
                        : list_poster_default.src
                    }`}
                    alt="List Poster"
                    width="167"
                    height="40"
                  ></img>
                </div>
              </LazyLoad>

              <Link href={`/list/${m.id}`} passHref>
                <a className="flex-one link-list">{m.listname}</a>
              </Link>
              <small>{dateFormat(m.inserted_at)}</small>
              {user?.id === m.user_id && (
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteList(m.id)}
                >
                  x
                </button>
              )}
            </section>
          ))
        ) : (
          <div className="flex-one">
            <p>Nenhuma lista encontrada.</p>
          </div>
        )}
      </div>
      {!endLoadMore && items.length > 10 && (
        <button className="btn btn-primary" onClick={loadMore}>
          loadMore
        </button>
      )}
    </section>
  );
};

export default Lists;
