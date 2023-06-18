"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";

// COMPONENTS =========================================
import { logoutUser } from "@/store/features/user/authSlice";
import { SearchBar } from "..";

// ===================================================
// HEADER LAYOUT COMPONENT (app/page.tsx) ============
// ===================================================
export default function Header() {
  const dispatch = useAppDispatch();
  const { loggedIn, user, loading, error } = useAppSelector(
    state => state.auth
  );

  // handle logout
  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  // RETURN ==========================================
  return (
    <header className="border-b border-b-gray-300 shadow-sm bg-white py-3">
      <div className="container w-[90%] md:w-[75%] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex gap-4 items-center">
          {/* logo */}
          <Link href="/" className="text-2xl font-bold">
            News
          </Link>
          {/* search bar  */}
          <SearchBar />
        </div>
        {loggedIn && user ? (
          <div className="flex gap-4 items-center">
            <p className="capitalize">{user.name}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleLogOut}
            >
              {loading ? "Loading..." : error ? error : "Logout"}
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            {/* buttons  */}
            <Link href="/login" className="text-gray-600 px-4 py-2 rounded-md">
              Login
            </Link>
            <Link
              href="/register"
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
            >
              Create account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

// EXTENDED COMPONENTS =================================
