import closeIcon from "@assets/icons/close.svg";
import SpinLoader from "@components/loading/SpinLoader";
import useSearch from "@hooks/useSearch";
import { useState } from "react";
import SearchResult from "./SearchResult";

const SearchModal = ({ onClose }) => {
  const [searchedText, setSearchedText] = useState("");
  const { data, isError, isLoading, error } = useSearch(searchedText);

  const handleSearch = (e) => {
    setSearchedText(e.target.value);
  };

  //default search result
  let searchResult = (
    <p className="text-red-500 font-semibold ">No Data Found</p>
  );
  console.log(data);

  // Show loading spinner
  if (isLoading) {
    searchResult = <SpinLoader />;
  }

  // Show error message
  if (isError) {
    searchResult = (
      <p className="text-red-500 font-semibold ">
        {error?.message || "Something went wrong"}
      </p>
    );
  }

  //if data is available
  if (data.length > 0) {
    searchResult = data.map((blog) => (
      <SearchResult
        key={blog.id}
        thumbnail={blog.thumbnail}
        title={blog.title}
        content={blog.content}
      />
    ));
  }

  return (
    <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
      {/* <!-- Search --> */}
      <div>
        <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
          Search for Your Desire Blogs
        </h3>
        <input
          type="text"
          value={searchedText}
          onChange={handleSearch}
          placeholder="Start Typing to Search"
          className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
        />
      </div>

      {/* <!-- Search Result --> */}
      <div className="">
        <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
        <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
          {searchResult}
        </div>
      </div>

      <span onClick={onClose}>
        <img
          src={closeIcon}
          alt="Close"
          className="absolute right-2 top-2 cursor-pointer w-8 h-8"
        />
      </span>
    </div>
  );
};

export default SearchModal;
