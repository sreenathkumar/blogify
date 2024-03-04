import { getImage } from "@utils/getImage";

export default function AvatarImage({ name, avatar }) {
  return (
    <div className="avater-img bg-orange-600 text-white">
      {avatar ? (
        <img
          className="w-full h-full object-cover rounded-full"
          src={getImage(avatar, "avatar")}
          alt={`${name}_avatar`}
        />
      ) : (
        <span className="">{name[0]}</span>
      )}
    </div>
  );
}
