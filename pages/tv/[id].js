import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import useFetch from '../../utils/useFetch';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/useUser';
import { supabase } from '../../utils/supabase';
import { containsObjectId } from '../../utils';
import { useState } from 'react';
import Message from '../../components/Message';
import LazyLoad from 'react-lazy-load';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const { user, profile } = useUser();
  const [message, setMessage] = useState(false);

  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const addMovie = async (action) => {
    if (action === 0) {
      // busca os filmes já vistos pelo usuário
      let { data: p, error } = await supabase
        .from('profiles')
        .select('movies_watched')
        .eq('user_id', user.id);

      // verifica se já está na lista
      const array = p[0]?.movies_watched ?? [];
      const watched = containsObjectId(data.id, array);
      const newArray = [...array, data];

      // se não, insere
      if (!watched) {
        const body = { movies_watched: newArray };
        const { data, error } = await supabase
          .from('profiles')
          .update([body])
          .eq('user_id', user.id);
        if (error) alert('erro !watched');
        setMessage(true);
        setTimeout(() => setMessage(false), 2000);
      } else {
        alert('ja tem esse filme');
      }
    } else if (action == 1) {
      // busca os filmes já está na lista do usuário
      let { data: s, error } = await supabase
        .from('profiles')
        .select('movies_to_see')
        .eq('user_id', user.id);

      // verifica se já está na lista
      const array = s[0]?.movies_to_see ?? [];
      const to_see = containsObjectId(data.id, array);
      const newArray = [...array, data];

      // se não, insere
      if (!to_see) {
        const body = { movies_to_see: newArray };
        const { data, error } = await supabase.from('profiles').update([body]);
        if (error) alert('erro !to_see');
        setMessage(true);
        setTimeout(() => setMessage(false), 2000);
      } else {
        alert('ja tem esse filme');
      }
    }
  };

  return (
    <section className="grid-0">
      <div>
        <LazyLoad offsetVertical={300}>
          <img
            width="140"
            height="210"
            alt={data.original_title}
            src={`http://image.tmdb.org/t/p/w185${data.poster_path}`}
          />
        </LazyLoad>
      </div>

      <div>
        <h1>{data.original_title}</h1>
        <small>{data.release_date}</small>
        <p>{data.overview}</p>

        {data.genres
          ? data.genres.map((g) => <small key={g.id}>{g.name}</small>)
          : ''}

        <div className="flex-1">
          {/* FIXME: check */}
          <button
            onClick={() => addMovie(0)}
            className={`btn ${
              containsObjectId(id, profile?.movies_watched ?? false)
                ? 'btn-primary'
                : 'btn-disabled'
            } btn-100`}
            disabled={containsObjectId(id, profile?.movies_watched ?? false)}
          >
            Já vi
          </button>

          <button
            onClick={() => addMovie(1)}
            className={`btn ${
              containsObjectId(id, profile?.movies_to_see ?? false)
                ? 'btn-primary'
                : 'btn-disabled'
            } btn-100`}
            disabled={containsObjectId(id, profile?.movies_to_see ?? false)}
          >
            Vou ver
          </button>
        </div>
        {message && (
          <Message type="success" message="Item adicionado com sucesso." />
        )}
      </div>
    </section>
  );
}
