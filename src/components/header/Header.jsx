import { actions } from "@actions/actions";
import searchIcon from "@assets/icons/search.svg";
import logo from "@assets/logo.svg";
import AvatarImage from "@components/AvatarImage";
import SearchModal from "@components/search/SearchModal";
import { useAuth } from "@hooks/useAuth";
import usePortal from "@hooks/usePortal";
import { Link } from "react-router-dom";

export default function Header() {
  const { auth, dispatchAuth } = useAuth();
  const { openModal, closeModal, ModalPortal } = usePortal(); //hook to open and close the search modal

  // =================================================================
  // Function to handle the logout
  // It will remove the token from the local storage.
  // Logout the user and update the context
  // ================================================================
  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatchAuth({ type: actions.auth.LOGOUT });
  };

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
              {auth.accessToken && (
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
                onClick={() => openModal()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={searchIcon} alt="Search" />
                <span>Search</span>
              </a>

              <ModalPortal>
                <SearchModal onClose={closeModal} />
              </ModalPortal>
            </li>

            {/* Logged-in user's avatar and name */}
            {auth?.accessToken ? (
              <>
                <li className="flex items-center">
                  <Link
                    className="flex items-center"
                    to={`user/${auth?.user?.id}/profile`}
                  >
                    <AvatarImage
                      name={auth?.user?.firstName}
                      avatar={auth?.user?.avatar}
                    />
                    {/* Logged-in user's name */}
                    <span className="text-white ml-2">
                      {auth.user?.firstName + " " + auth?.user?.lastName}
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer hover:text-white transition-all duration-200"
                  >
                    Logout
                  </a>
                </li>
              </>
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
