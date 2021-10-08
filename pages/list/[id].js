import { useRouter } from 'next/router';
import { useUser } from '../../utils/useUser';
import { supabase } from '../../utils/supabase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import poster_default from '../../assets/poster.png';
import LazyLoad from 'react-lazy-load';
import Masonry from 'react-masonry-css';
import { breakpointColumnsObj } from '../../utils/constants';
import ImageCard from '../../components/ImageCard';

export default function Movie({ list }) {
  const router = useRouter();
  const { id } = router.query;
  const { user, profile } = useUser();
  const [message, setMessage] = useState(false);
  const [items, setItems] = useState(false);

  useEffect(() => {
    if (list?.items && list.items.length > 0) setItems(list.items);
  }, [list]);

  //  if (isLoading) return <Spinner />;
  //  if (isError) return <Error />;
  return (
    <section>
      <h1>Nome: {list?.listname ?? 'Lista'}</h1>
      <div className="flex-center">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {items.length > 0 &&
            items.map((x) => <ImageCard key={x.id} content={x} />)}
        </Masonry>
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  let { data: lists, error } = await supabase.from('lists').select('id');

  const paths = lists.map((list) => ({
    params: { id: list.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  let { data: list, error } = await supabase
    .from('lists')
    .select('*')
    .eq('id', id)
    .single();

  return {
    revalidate: 60,
    props: { list },
  };
}
