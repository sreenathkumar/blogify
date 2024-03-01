export default function SingleComment() {
  return (
    <div className="flex items-start space-x-4 my-8">
      <div className="avater-img bg-orange-600 text-white">
        <span className="">S</span>
      </div>
      <div className="w-full">
        <h5 className="text-slate-500 font-bold">Saad Hasan</h5>
        <p className="text-slate-300">
          Today I was mob programming with Square&#39;s Mobile & Performance
          Reliability team and we toyed with an interesting idea. Our codebase
          has classes that represent screens a user can navigate to. These
          classes are defined in modules, and these modules have an owner team
          defined. When navigating to a screen, we wanted to have the owner team
          information available, at runtime. We created a build tool that looks
          at about 1000 Screen classes, determines the owner team, and generates
          a class to do the lookup at runtime. The generated code looked like
          this:
        </p>
      </div>
    </div>
  );
}
