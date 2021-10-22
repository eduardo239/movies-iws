/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { dateFormat } from '../utils';
import Link from 'next/link';
import fig1 from '../assets/fig1.png';
import list from '../assets/eva_list-outline.svg';
import LazyLoad from 'react-lazyload';
import poster_default from '../assets/poster.png';

const Lists = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [endLoadMore, setEndLoadMore] = useState(false);

  const loadMore = async () => {
    if (!endLoadMore) {
      let { data: lists, error } = await supabase
        .from('lists')
        .select('*')
        .range(page * limit, page * limit * 2)
        .order('inserted_at', { ascending: false });

      console.log(lists);
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
      {!endLoadMore && (
        <button className="btn" onClick={loadMore}>
          loadMore
        </button>
      )}
      <div>
        {items.map((m) => (
          <section key={m.id} className="list-items">
            <LazyLoad height={40} once placeholder={poster_default.src}>
              <img
                src={fig1.src}
                alt="List Poster"
                width="167"
                height="40"
              ></img>
            </LazyLoad>
            {m.id}
            <Link href={`/list/${m.id}`} passHref>
              <a className="flex-one link-list">{m.listname}</a>
            </Link>
            <small>{dateFormat(m.inserted_at)}</small>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Lists;
