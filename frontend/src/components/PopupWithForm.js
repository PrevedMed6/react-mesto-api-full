import React from "react";

export default function PopupWithForm(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(false);
  }, [props.isOpen]);

  function handleSubmit(e) {
    setIsLoading(true);
    props.onSubmit(e);
  }

  return (
    <section
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
      onClick={props.onClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={handleSubmit}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            className={`popup__button ${
              props.isValid ? "" : "popup__button_disabled"
            }`}
          >
            {isLoading ? props.loadingButtonText : props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
