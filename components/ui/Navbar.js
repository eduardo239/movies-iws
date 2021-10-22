import { useEffect } from 'react';
import { useUser } from '../../utils/useUser';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import homeIcon from '../../assets/eva_home-outline.svg';
import calendarIcon from '../../assets/eva_calendar-outline.svg';
import listIcon from '../../assets/eva_list-outline.svg';
import logoutIcon from '../../assets/eva_log-out-outline.svg';
import userIcon from '../../assets/eva_person-outline.svg';
import loginIcon from '../../assets/eva_log-in-outline.svg';
import registerIcon from '../../assets/eva_person-outline.svg';
import logo from '../../assets/MOVIES-IWS3.svg';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const { user, logout, profile, updateProfile } = useUser();

  const userLogout = () => {
    logout();
    router.replace('/');
  };

  useEffect(() => {
    if (user) updateProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="menu-nav">
      <Link href="/" passHref>
        <button className="btn-icon btn-primary">
          <img src={homeIcon.src} alt="Home" width="24" height="24" />
          <span>Início</span>
        </button>
      </Link>
      <Link href="/upcoming" passHref>
        <button className="btn-icon btn-primary">
          <img src={calendarIcon.src} alt="Upcoming" width="24" height="24" />{' '}
          <span>Em Breve</span>
        </button>
      </Link>
      <Link href="/lists" passHref>
        <button className="btn-icon btn-primary">
          <img src={listIcon.src} alt="Lists" width="24" height="24" />{' '}
          <span>Listas</span>
        </button>
      </Link>

      {/* FIXME: ao logar get user profile */}
      {profile && (
        <Link href={`/user/${profile?.username ?? ''}`} passHref>
          <button className="btn-icon btn-primary">
            {/* @{profile?.username ?? `profile`} */}
            <img
              src={userIcon.src}
              alt="User Profile"
              width="24"
              height="24"
            />{' '}
            <span>{profile?.username ?? 'Usuário'}</span>
          </button>
        </Link>
      )}

      {!user && (
        <>
          <Link href="/login" passHref>
            <button className="btn-icon btn-primary">
              <img src={loginIcon.src} alt="Login" width="24" height="24" />{' '}
              <span>Entrar</span>
            </button>
          </Link>

          <Link href="/register" passHref>
            <button className="btn-icon btn-primary">
              <img src={registerIcon.src} alt="Logout" width="24" height="24" />{' '}
              <span>Registrar</span>
            </button>
          </Link>
        </>
      )}

      {user && (
        <>
          <button
            className="btn-icon btn-primary"
            onClick={userLogout}
            style={{ opacity: '0.6' }}
          >
            <img src={logoutIcon.src} alt="Logo" width="24" height="24" />{' '}
            <span>Sair</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
