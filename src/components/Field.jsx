import React from "react";

const Field = ({ label, htmlFor, children, error }) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={id} className="block mb-2">
          {label}
        </label>
      )}
      {children}
      {!!error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);

  if (child && child.props.id) {
    return child.props.id;
  }
  return null;
};

export default Field;
