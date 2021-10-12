/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useUser } from '../../utils/useUser';
import homeIcon from '../../assets/eva_home-outline.svg';
import calendarIcon from '../../assets/eva_calendar-outline.svg';
import listIcon from '../../assets/eva_list-outline.svg';
import logoutIcon from '../../assets/eva_log-out-outline.svg';
import userIcon from '../../assets/eva_person-outline.svg';
import loginIcon from '../../assets/eva_log-in-outline.svg';
import registerIcon from '../../assets/eva_person-outline.svg';
import logo from '../../assets/MOVIES-IWS3.svg';

const Navbar = () => {
  const { user, logout, profile } = useUser();

  return (
    <div className="menu-nav">
      <Link href="/">
        <a>
          <img src={logo.src} alt="Home" width="115" height="30" />
        </a>
      </Link>
      <Link href="/upcoming">
        <a>
          <img src={calendarIcon.src} alt="Upcoming" width="24" height="24" />
        </a>
      </Link>
      <Link href="/lists">
        <a>
          <img src={listIcon.src} alt="Lists" width="24" height="24" />
        </a>
      </Link>

      {user && (
        <Link href={`/user/${profile?.username ?? ''}`}>
          <a>
            {/* @{profile?.username ?? `profile`} */}
            <img src={userIcon.src} alt="User Profile" width="24" height="24" />
          </a>
        </Link>
      )}

      {!user && (
        <>
          <Link href="/login">
            <a>
              <img src={loginIcon.src} alt="Login" width="24" height="24" />
            </a>
          </Link>

          <Link href="/register">
            <a>
              <img src={registerIcon.src} alt="Logout" width="24" height="24" />
            </a>
          </Link>
        </>
      )}

      {user && (
        <>
          <button
            className="btn-icon-only btn-secondary"
            style={{ opacity: '0.5' }}
            onClick={logout}
          >
            <img src={logoutIcon.src} alt="Logo" width="24" height="24" />
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
