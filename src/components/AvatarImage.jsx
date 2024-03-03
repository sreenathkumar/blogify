export default function AvatarImage({ name, imgUrl }) {
  return (
    <div className="avater-img bg-orange-600 text-white">
      {imgUrl ? (
        <img className="avater-img" src={imgUrl} alt={`${name}_avatar`} />
      ) : (
        <span className="">{name[0]}</span>
      )}
    </div>
  );
}
