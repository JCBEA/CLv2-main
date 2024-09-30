"use client";

import { useAuth } from '@/context/authcontext'; // Import useAuth hook from AuthContext
import Link from 'next/link';

const Header = () => {
  const { user, logout } = useAuth(); // Access global auth state via the useAuth hook

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Creative Legazpi</div>
        <ul className="flex gap-4 items-center">
          {/* Conditionally change the Home link based on user state */}
          <li>
            <Link href={user ? "/dashboard" : "/landing"} className="hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/directory" className="hover:text-blue-200">
              Directory
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:text-blue-200">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-blue-200">
              FAQ
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link href="/login" className="hover:text-blue-200">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-blue-200">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={logout} className="hover:text-blue-200">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
