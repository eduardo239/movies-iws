import Link from 'next/link';
import { useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useUser } from '../../utils/useUser';
import logo from '../../assets/eva_home-outline.svg';
import Image from 'next/image';

const Navbar = () => {
  const { user, logout, profile } = useUser();

  return (
    <div className="menu-nav">
      <Link href="/">
        <a>
          <Image src={logo.src} alt="Logo" width="24" height="24" />
        </a>
      </Link>
      <Link href="/upcoming">
        <a>Em Breve</a>
      </Link>
      <Link href="/lists">
        <a>Listas</a>
      </Link>

      {user && (
        <Link href={`/user/${user?.id ?? ''}`}>
          <a>@{profile?.username ?? `profile`}</a>
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
        <button style={{ opacity: '0.5' }} onClick={logout}>
          Sair
        </button>
      )}
    </div>
  );
};

export default Navbar;
