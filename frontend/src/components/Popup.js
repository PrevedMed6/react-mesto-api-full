import React from "react";

const Popup = ({ component: Component, ...props }) => {
  function handleClose(e) {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  }

  React.useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };
    if (props.isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [props.isOpen]);

  const newProps = { ...props };
  newProps.onClose = handleClose;
  return <Component {...newProps} />;
};

export default Popup;
