import Link from 'next/link';
import { useUser } from '../../utils/useUser';
import homeIcon from '../../assets/eva_home-outline.svg';
import calendarIcon from '../../assets/eva_calendar-outline.svg';
import listIcon from '../../assets/eva_list-outline.svg';
import logoutIcon from '../../assets/eva_log-out-outline.svg';
import userIcon from '../../assets/eva_person-outline.svg';
import loginIcon from '../../assets/eva_log-in-outline.svg';
import registerIcon from '../../assets/eva_person-outline.svg';
import Image from 'next/image';

const Navbar = () => {
  const { user, logout, profile } = useUser();

  return (
    <div className="menu-nav">
      <Link href="/">
        <a>
          <Image src={homeIcon.src} alt="Home" width="24" height="24" />
        </a>
      </Link>
      <Link href="/upcoming">
        <a>
          <Image src={calendarIcon.src} alt="Upcoming" width="24" height="24" />
        </a>
      </Link>
      <Link href="/lists">
        <a>
          <Image src={listIcon.src} alt="Lists" width="24" height="24" />
        </a>
      </Link>

      {user && (
        <Link href={`/user/${user?.id ?? ''}`}>
          <a>
            {/* @{profile?.username ?? `profile`} */}
            <Image
              src={userIcon.src}
              alt="User Profile"
              width="24"
              height="24"
            />
          </a>
        </Link>
      )}

      {!user && (
        <>
          <Link href="/login">
            <Image src={loginIcon.src} alt="Login" width="24" height="24" />
          </Link>

          <Link href="/register">
            <Image src={registerIcon.src} alt="Logout" width="24" height="24" />
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
