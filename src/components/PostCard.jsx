import threeDots from "../assets/icons/3dots.svg";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/delete.svg";

export default function PostCard({
  image,
  title,
  description,
  authorName,
  authorDate,
  likes,
  onEdit,
  onDelete,
}) {
  return (
    <div className="blog-card bg-white rounded-lg shadow-lg p-4">
      <img
        className="blog-thumb w-full h-40 object-cover rounded-lg mb-4"
        src={image}
        alt=""
      />
      <div className="mt-2 relative">
        <a href="./single-blog.html">
          <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
            {title}
          </h3>
        </a>
        <p className="mb-6 text-base text-slate-500 mt-1">{description}</p>

        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avatar-img bg-indigo-600 text-white">
              <span className="text-sm">{authorName}</span>
            </div>

            <div>
              <h5 className="text-slate-500 text-sm">{authorName}</h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{authorDate}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{likes} Likes</span>
          </div>
        </div>

        {/* Action dot */}
        <div className="absolute right-0 top-0">
          <button>
            <img src={threeDots} alt="3dots of Action" />
          </button>

          {/* Action Menus Popup */}
          <div className="action-modal-container">
            <button
              onClick={onEdit}
              className="action-menu-item hover:text-lwsGreen"
            >
              <img src={editIcon} alt="Edit" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="action-menu-item hover:text-red-500"
            >
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
