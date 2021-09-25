import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user, signIn, userSignUp } = useUser();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { user, error } = await userSignUp({
      email,
      username,
      password,
    });

    setError(error?.message ?? null);

    setLoading(false);
  };

  // const handleOAuthSignIn = async (provider) => {
  //   setLoading(true);
  //   const { error } = await signIn({ provider });

  //   setLoading(false);
  // };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user)
    return (
      <section>
        <h1>Register</h1>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="register-username">Username</label>
            <input
              type="text"
              id="register-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">registrar</button>
          </div>
        </form>

        <Link href="/login">
          <a className="small">Já tem uma conta? Faça o login</a>
        </Link>

        <div>{error && <p>{error}</p>}</div>
      </section>
    );
  return <section className="flex-center-center">loading</section>;
};

export default Register;
