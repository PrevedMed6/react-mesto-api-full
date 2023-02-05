import React from "react";
export default function ConfirmPopup({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <section
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
      onClick={onClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__heading">{title}</h2>
        <button
          type="button"
          className="popup__button popup__button_isconfirm"
          onClick={onConfirm}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}
