import threeDots from "@icons/3dots.svg";
import deleteIcon from "@icons/delete.svg";
import editIcon from "@icons/edit.svg";
import truncateText from "@utils/truncateText";

export default function PostCard({title, content, image, author, date, likes}) {
  
  return (
    <div className="blog-card">
      <img
        className="blog-thumb"
        src={`http://localhost:3000/uploads/blog/${image}` || "http://via.placeholder.com/300x200"}
        alt=""
      />
      <div className="mt-2 relative">
        <a href="./single-blog.html">
          <h3 className="text-slate-300 text-xl lg:text-2xl">
            <a href="./single-blog.html">{title}</a>
          </h3>
        </a>
        <p className="mb-6 text-base text-slate-500 mt-1">
          {truncateText(content, 200)}
        </p>

        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">{author[0]}</span>
            </div>

            <div>
              <h5 className="text-slate-500 text-sm">
                <a href="./profile.html">{author}</a>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{date}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{likes} Likes</span>
          </div>
        </div>

        {/* action dot */}
        <div className="absolute right-0 top-0">
          <button>
            <img src={threeDots} alt="3dots of Action" />
          </button>

          {/* Action Menus Popup */}
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={editIcon} alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
              <img src={deleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        </div>
        {/* action dot ends */}
      </div>
    </div>
  );
}
