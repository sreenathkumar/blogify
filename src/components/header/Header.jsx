import logo from "@assets/logo.svg";
import searchIcon from "@assets/icons/search.svg";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export default function Header() {
  const { auth } = useAuth();

  return (
    <header>
      <nav className="container">
        {/* Logo */}
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>

        {/* Actions - Login, Write, Home, Search */}
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              {auth.user && (
                <Link
                  to="blog/add-new"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              )}
            </li>
            <li>
              <a
                href="./search.html"
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={searchIcon} alt="Search" />
                <span>Search</span>
              </a>
            </li>

            {/* Logged-in user's avatar and name */}
            {auth.user ? (
              <li className="flex items-center">
                {/* Circular Div with background color */}
                <div className="avater-img bg-orange-600 text-white">
                  <span className="">S</span>
                </div>

                {/* Logged-in user's name */}
                <Link to="/profile">
                  <span className="text-white ml-2">Saad Hasan</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
