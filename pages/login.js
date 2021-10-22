import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({
    error: null,
    message: '',
    type: 'success',
  });
  const { user, signIn } = useUser();

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn({
      email,
      password,
    });

    setMessage({ ...message, type: 'error', message: error?.message });
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

      <h2 className="text-center mb-20">Login</h2>

      <div className="flex-center">
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
            <button className="btn btn-primary w-100">Login</button>
          </div>

          <div className="mb-10">
            <Link href="/register">
              <a className="small">Não tem uma conta? Se inscreva</a>
            </Link>
          </div>

          {loading && <Spinner />}

          {message.message && (
            <Error type={message.type} message={message.message} />
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
