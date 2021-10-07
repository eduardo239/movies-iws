import { useRouter } from 'next/router';
import { useUser } from '../../utils/useUser';
import { supabase } from '../../utils/supabase';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Movie({ list }) {
  const router = useRouter();
  const { id } = router.query;
  const { user, profile } = useUser();
  const [message, setMessage] = useState(false);
  const [items, setItems] = useState(false);

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  useEffect(() => {
    if (list?.items && list.items.length > 0) setItems(list.items);
  }, [list]);

  return (
    <section>
      <h1>{list?.listname ?? 'Lista'}</h1>
      <div className="flex-center gap-10">
        {items.length > 0 &&
          items.map((m) => (
            <div key={m.id} className="movie-item">
              <Link href={`/movie/${m.id}`} passHref>
                <a>
                  <LazyLoad height={214} once placeholder={poster_default.src}>
                    <img
                      width="140"
                      height="210"
                      alt={
                        m.original_title
                          ? m.original_title
                          : m.original_name
                          ? m.original_name
                          : `none`
                      }
                      src={`http://image.tmdb.org/t/p/w185${m.poster_path}`}
                    />
                  </LazyLoad>
                  <small>
                    {m.original_title
                      ? m.original_title
                      : m.original_name
                      ? m.original_name
                      : `none`}
                  </small>
                </a>
              </Link>
            </div>
          ))}
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
