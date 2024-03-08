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

//find isFavourite
export const findFavourite = (favourites, id) => {
  if (favourites && favourites.length > 0) {
    return favourites.some((fav) => fav.id === id);
  }
  return false;
};

//find isLiked
export const findLiked = (likes, id) => {
  if (likes && likes.length > 0) {
    return likes.some((fav) => fav.id === id);
  }
  return false;
};

//create data url of file
export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

//create form data from generic object
export function objectToFormData(obj) {
  const formData = new FormData();
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
}
