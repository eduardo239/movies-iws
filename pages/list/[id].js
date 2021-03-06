import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabase';
import { useState, useEffect } from 'react';
import { breakpointColumnsObj } from '../../utils/constants';
import Masonry from 'react-masonry-css';
import ImageCardTrailer from '../../components/card/ImageCardTrailer';
import Spinner from '../../components/Spinner';

export default function Movie({ list }) {
  const router = useRouter();
  const [items, setItems] = useState(false);

  useEffect(() => {
    if (list?.items && list.items.length > 0) setItems(list.items);
  }, [list]);

  if (!items) return <Spinner />;
  // if (isError) return <Error />;

  return (
    <section>
      <h1 className="text-center">Lista: {list?.listname ?? ''}</h1>
      <div className="flex-center mb-20 ">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {items.length > 0 &&
            items.map((x) => <ImageCardTrailer key={x.id} content={x} />)}
        </Masonry>
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  let { data: lists, error } = await supabase.from('lists').select('id');

  if (error) console.log(error);

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
  if (error) console.log(error);

  return {
    revalidate: 60,
    props: { list },
  };
}
