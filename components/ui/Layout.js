import s from '../../styles/Layout.module.css';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={s.container}>
        <main className={s.main}>{children}</main>
        <div className={s.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
