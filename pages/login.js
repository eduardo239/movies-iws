import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user, signIn } = useUser();

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn({
      email,
      password,
    });
    setError(error?.message ?? null);
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user)
    return (
      <section>
        <Head>
          {/* <title>{`${app_name} - Login`}</title>
          <meta
            name="description"
            content={`${app_name} - ${app_description}`}
          />
          <link rel="icon" href="/favicon.ico" /> */}
        </Head>

        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              required
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              required
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>

        <Link href="/register">
          <a className="small">Não tem uma conta? Se inscreva</a>
        </Link>
        <div>{error && <p>{error}</p>}</div>
      </section>
    );
  return <section className="flex-center-center">loading</section>;
};

export default Login;
