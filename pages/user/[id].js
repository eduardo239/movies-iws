import { supabase } from '../../utils/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Message from '../../components/Message';
import { containsObjectId } from '../../utils';
import { removeItemFromProfile } from '../../utils/movies';
import closeIcon from '../../assets/eva_close-outline.svg';

const Profile = ({ profile }) => {
  const [message, setMessage] = useState(false);

  const [toSee, setToSee] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    if (profile?.movies_to_see && profile.movies_to_see.length > 0)
      setToSee(profile.movies_to_see);
    if (profile?.movies_watched && profile.movies_watched.length > 0)
      setWatched(profile.movies_watched);
  }, [profile]);

  const removeFromWatched = async (m) => {
    setMessage(false);
    const data = await removeItemFromProfile(m, profile.user_id, 0);
    setWatched(data.movies_watched);
    setMessage(true);
    setTimeout(() => setMessage(false), 2000);
  };

  const removeFromToSee = async (m) => {
    setMessage(false);
    const data = await removeItemFromProfile(m, profile.user_id, 1);
    setToSee(data.movies_to_see);
    setMessage(true);
    setTimeout(() => setMessage(false), 2000);
  };

  if (profile)
    return (
      <div className="w-100">
        <section>
          <h4>Conta: @{profile?.username}</h4>
        </section>

        <hr />
        <div>
          {message && (
            <Message type="success" message="Item removido com sucesso." />
          )}
        </div>

        <h2 className="mb-10 text-center">Filmes já vistos.</h2>
        <section className="flex-center mb-20 gap-10">
          {watched
            .splice(0, 5)
            .map((m) => (
              <div key={m.id} className="movie-item">
                <Link href={`/movie/${m.id}`} passHref>
                  <a className="mb-20">
                    <Image
                      width="140"
                      height="210"
                      alt={m.original_title}
                      src={`http://image.tmdb.org/t/p/w185${m.poster_path}`}
                    />
                    <small>{m.original_title}</small>
                  </a>
                </Link>
                <div>
                  <button
                    className="btn-icon-only btn-secondary"
                    onClick={() => removeFromWatched(m)}
                  >
                    <Image
                      width="24"
                      height="24"
                      alt={m.original_title}
                      src={closeIcon.src}
                    />
                  </button>
                </div>
              </div>
            ))
            .reverse()}
        </section>

        <hr />

        <h2 className="mb-10 text-center">Filmes para ver.</h2>
        <section className="flex-center mb-20 gap-10">
          {toSee
            .splice(0, 5)
            .map((m) => (
              <div key={m.id} className="movie-item">
                <Link href={`/movie/${m.id}`} passHref>
                  <a className="mb-20">
                    <Image
                      width="140"
                      height="210"
                      alt={m.original_title}
                      src={`http://image.tmdb.org/t/p/w185${m.poster_path}`}
                    />
                    <small>{m.original_title}</small>
                  </a>
                </Link>
                <div>
                  <button
                    className="btn-icon-only btn-secondary "
                    onClick={() => removeFromToSee(m)}
                  >
                    <Image
                      width="24"
                      height="24"
                      alt={m.original_title}
                      src={closeIcon.src}
                    />
                  </button>
                </div>
              </div>
            ))
            .reverse()}
        </section>

        <hr />

        <h2 className="mb-10 text-center">Minhas listas.</h2>
        <section className="flex-center mb-20 gap-10">2</section>
      </div>
    );

  return <section>loading</section>;
};

export default Profile;

export async function getStaticPaths() {
  let { data: profiles, error } = await supabase.from('profiles').select('id');

  const paths = profiles.map((profile) => ({
    params: { id: profile.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', id)
    .single();

  return {
    revalidate: 60,
    props: { profile },
  };
}
