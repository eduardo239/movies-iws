import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({
    error: null,
    message: '',
    type: 'success',
  });
  const { user, signIn, userSignUp } = useUser();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { user, error } = await userSignUp({
      email,
      username,
      password,
    });

    if (error?.status === 400) {
      setMessage({
        ...message,
        type: 'error',
        message: 'Houve um erro genérico',
      });
    }
    if (user && error?.status !== 400) {
      setMessage({
        ...message,
        type: 'success',
        message: 'An email has been sent',
      });
    } else {
      setMessage({ ...message, type: 'error', message: error?.message });
    }

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
      <h2 className="text-center mb-20">Register</h2>

      <div className="flex-center">
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
            <button className="btn btn-primary w-100">registrar</button>
          </div>

          <div className="mb-10">
            <Link href="/login">
              <a className="small">Já tem uma conta? Faça o login</a>
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

export default Register;
