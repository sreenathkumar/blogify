import logo from "@assets/logo.svg";
import searchIcon from "@assets/icons/search.svg";
import { Link } from "react-router-dom";

export default function Header() {
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
              <Link
                to="blog/add-new"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
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
            <li>
              <Link
                to="/login"
                className="text-white/50 hover:text-white transition-all duration-200"
              >
                Login
              </Link>
            </li>
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
          </ul>
        </div>
      </nav>
    </header>
  );
}
