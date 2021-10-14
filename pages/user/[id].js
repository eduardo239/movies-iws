/* eslint-disable @next/next/no-img-element */
import { supabase } from '../../utils/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Message from '../../components/Message';
import ImageCard from '../../components/ImageCard';
import Spinner from '../../components/Spinner';
import addIcon from '../../assets/eva_plus-circle-outline.svg';
import subIcon from '../../assets/eva_minus-circle-outline.svg';
import { removeItemFromProfile } from '../../utils/movies';
import { useUser } from '../../utils/useUser';

const Profile = () => {
  const [toSee, setToSee] = useState([]);
  const [watched, setWatched] = useState([]);
  const { user, profile, getUserProfile } = useUser();

  useEffect(() => {
    (async function () {
      if (user) getUserProfile(user.id);
    })();

    setToSee(profile?.movies_to_see);
    setWatched(profile?.movies_watched);
  }, [profile, user]);

  const removeItem = async (x, table) => {
    const { movies_watched, movies_to_see } = await removeItemFromProfile(
      x,
      profile.user_id,
      table
    );
    setToSee(movies_to_see);
    setWatched(movies_watched);
  };

  return (
    <>
      <section>
        <h5>Usuário: @{profile?.username ?? ''}</h5>
        <hr />
        <h3>Filmes para ver</h3>
        <div className="flex-start gap-10 mb-20">
          {toSee &&
            toSee
              .slice(-4)
              .map((x) => (
                <ImageCard key={x.id} content={x}>
                  <div className="flex-start gap-5">
                    <button
                      onClick={() => removeItem(x, 1)}
                      className="btn-icon-only btn-secondary w-100"
                    >
                      <img
                        src={subIcon.src}
                        alt="Search"
                        width="24"
                        height="24"
                      />
                    </button>
                  </div>
                </ImageCard>
              ))
              .reverse()}

          {toSee?.length > 4 && (
            <div style={{ alignSelf: 'center' }}>
              <Link href={`/user/${profile?.username}/movies-to-see`} passHref>
                <button className="btn-icon btn-primary">
                  <img
                    src={addIcon.src}
                    alt="Ver mais"
                    width="24"
                    height="24"
                  />{' '}
                  <span>Ver mais..</span>
                </button>
              </Link>
            </div>
          )}
        </div>
        <hr />
        <h3>Filmes já vistos</h3>
        <div className="flex-start gap-10 mb-20">
          {watched &&
            watched
              .slice(-4)
              .map((x) => (
                <ImageCard key={x.id} content={x}>
                  <div className="flex-start gap-5">
                    <button
                      onClick={() => removeItem(x, 0)}
                      className="btn-icon-only btn-secondary w-100"
                    >
                      <img
                        src={subIcon.src}
                        alt="Search"
                        width="24"
                        height="24"
                      />
                    </button>
                  </div>
                </ImageCard>
              ))
              .reverse()}
          {watched?.length > 4 && (
            <div style={{ alignSelf: 'center' }}>
              <Link href={`/user/${profile?.username}/watched-movies`} passHref>
                <button className="btn-icon btn-primary">
                  <img
                    src={addIcon.src}
                    alt="Ver mais"
                    width="24"
                    height="24"
                  />{' '}
                  <span>Ver mais..</span>
                </button>
              </Link>
            </div>
          )}
        </div>
        <hr />
      </section>
    </>
  );
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
  const username = context.params.id;

  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  // TODO:
  // if (profile.length === 0) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    revalidate: 120,
    props: { profile },
  };
}
