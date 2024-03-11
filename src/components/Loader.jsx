import { forwardRef } from "react";

// Correct the order of arguments, ref should be the second argument
// eslint-disable-next-line react/display-name
const Loader = forwardRef((props, ref) => {
  return (
    <div className="spinner-box" ref={ref}>
      <div className="pulse-container">
        <div className="pulse-bubble pulse-bubble-1"></div>
        <div className="pulse-bubble pulse-bubble-2"></div>
        <div className="pulse-bubble pulse-bubble-3"></div>
      </div>
    </div>
  );
});

export default Loader;
