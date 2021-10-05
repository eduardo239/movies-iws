import Link from 'next/link';
import { useUser } from '../../utils/useUser';
import homeIcon from '../../assets/eva_home-outline.svg';
import calendarIcon from '../../assets/eva_calendar-outline.svg';
import listIcon from '../../assets/eva_list-outline.svg';
import logoutIcon from '../../assets/eva_close-outline.svg';
import userIcon from '../../assets/eva_person-outline.svg';
import Image from 'next/image';

const Navbar = () => {
  const { user, logout, profile } = useUser();

  return (
    <div className="menu-nav">
      <Link href="/">
        <a>
          <Image src={homeIcon.src} alt="Logo" width="24" height="24" />
        </a>
      </Link>
      <Link href="/upcoming">
        <a>
          <Image src={calendarIcon.src} alt="Logo" width="24" height="24" />
        </a>
      </Link>
      <Link href="/lists">
        <a>
          <Image src={listIcon.src} alt="Logo" width="24" height="24" />
        </a>
      </Link>

      {user && (
        <Link href={`/user/${user?.id ?? ''}`}>
          <a>
            {/* @{profile?.username ?? `profile`} */}
            <Image src={userIcon.src} alt="Logo" width="24" height="24" />
          </a>
        </Link>
      )}

      {!user && (
        <>
          <Link href="/login">
            <a>Login</a>
          </Link>

          <Link href="/register">
            <a>Registro</a>
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
            <Image src={logoutIcon.src} alt="Logo" width="24" height="24" />
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
