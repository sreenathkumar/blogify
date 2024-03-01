import deleteIcon from "@icons/delete.svg";
import editIcon from "@icons/edit.svg";

export default function ActionMenu() {
  return (
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
  )
}
