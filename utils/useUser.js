import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    (async function () {
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session?.user.id)
        .single();
      setProfile(profile);
    })();

    return () => {
      authListener.unsubscribe();
    };
  }, []);

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

  const updateProfile = async () => {
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    setProfile(profile);
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
    updateProfile,
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
