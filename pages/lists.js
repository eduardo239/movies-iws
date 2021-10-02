import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { dateFormat } from '../utils';
import fig1 from '../assets/fig1.png';
import fig2 from '../assets/fig2.png';
import list from '../assets/eva_list-outline.svg';

const Lists = ({ lists }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (lists && lists.length > 0) setItems(lists);
  }, [lists]);

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
            <Image src={list.src} alt="See" width="24" height="24" /> Criar
            Lista
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
      <div className="flex-2">
        {items.map((m) => (
          <section key={m.id} className="list-items">
            <Image
              src={fig1.src}
              alt="List Poster"
              width="167"
              height="40"
            ></Image>
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

export async function getStaticProps(context) {
  let { data: lists, error } = await supabase
    .from('lists')
    .select('*')
    .limit(10)
    .order('inserted_at', { ascending: false });

  return {
    revalidate: 420,
    props: { lists },
  };
}
