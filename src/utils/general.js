import { Bounce, toast } from "react-toastify";

export const formatDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(newDate);

  return formattedDate;
};

//toast notification
export const notify = (message, type) => {
  toast(message, {
    type: type,
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

//find is favourite
export const findFavourite = (favourites, id) => {
  if (favourites && favourites.length > 0) {
    return favourites.some((fav) => fav.id === id);
  }
  return false;
};
