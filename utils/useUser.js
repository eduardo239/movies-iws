import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);

    // profile

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user)
      (async function () {
        let { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setProfile(profile);

        // session id
        // const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY_V4}`;
        // const body = JSON.stringify({
        //   request_token: `${process.env.NEXT_PUBLIC_TMDB_KEY_V4}`,
        // });
        // const options = {
        //   method: 'POST',
        //   body,
        // };
        // const response = await fetch(url, options);
        // const json = await response.json();

        // setSessionId(json.guest_session_id);
      })();
  }, [user]);

  const userSignUp = async (options) => {
    const { user, error } = await supabase.auth.signUp(options);
    if (user) {
      // cria uma linha na tabela profiles com o username
      const body = {
        username: options.username,
        user_id: user.id,
      };

      const { data, error } = await supabase.from('profiles').insert([body]);
      return { user: data, error };
    }
    return { user, error };
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    setSession(null);
    supabase.auth.signOut();
  };

  const value = {
    userSignUp,
    setUser,
    profile,
    sessionId,
    user,
    logout,
    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => {
      return supabase.auth.signOut();
    },
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
