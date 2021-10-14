import { useRouter } from 'next/router';
import { useUser } from '../../utils/useUser';
import { supabase } from '../../utils/supabase';
import { containsObjectId } from '../../utils';
import { useState } from 'react';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import useFetch from '../../utils/useFetch';
import Message from '../../components/Message';
import LazyLoad from 'react-lazyload';

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

  return <section className="grid-0">tv</section>;
}
