import AvatarImage from "./AvatarImage";

export default function SingleComment({authorName='Author Name', comment="Comment Content"}) {
  return (
    <div className="flex items-start space-x-4 my-8">
      <AvatarImage name={authorName[0]}/>
      <div className="w-full">
        <h5 className="text-slate-500 font-bold">{authorName}</h5>
        <p className="text-slate-300">
          {comment}
        </p>
      </div>
    </div>
  );
}
