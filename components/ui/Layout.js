import s from '../../styles/Layout.module.css';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <div className={s.header}>
        <Navbar />
      </div>
      <div className={s.container}>
        <main className={s.main}>{children}</main>
        <div className={s.footer}>
          <Footer>TMDB api</Footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
