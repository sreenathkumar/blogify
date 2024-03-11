import { getImage } from "@utils/getImage";
import truncateText from "@utils/truncateText";

const SearchResult = ({ thumbnail, title, content }) => {
  return (
    <div className="flex gap-6 py-2">
      <img
        className="h-28 object-contain"
        src={getImage(thumbnail, "blog")}
        alt={title}
      />
      <div className="mt-2">
        <h3 className="text-slate-300 text-xl font-bold">{title}</h3>
        {/* <!-- Meta Informations --> */}
        <p className="mb-6 text-sm text-slate-500 mt-1">
          {truncateText(content, 158)}
        </p>
      </div>
    </div>
  );
};

export default SearchResult;
