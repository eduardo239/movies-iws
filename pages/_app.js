import { useEffect, useState } from 'react';
import '../styles/reset.css';
import '../styles/globals.scss';
import '../styles/style.scss';
import Layout from '../components/ui/Layout';
import { UserContextProvider } from '../utils/useUser';

function App({ Component, pageProps }) {
  useEffect(() => {}, []);

  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
export default App;
