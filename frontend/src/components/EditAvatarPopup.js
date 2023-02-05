import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [validationMessage, setValidationMessage] = React.useState("");
  //очистим поля при закрытии формы
  React.useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = "";
      setFormIsValid(false);
      setValidationMessage("");
    }
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  function handleInput() {
    setFormIsValid(avatarRef.current.validity.valid);
    setValidationMessage(
      avatarRef.current.validity.valid
        ? ""
        : avatarRef.current.validationMessage
    );
  }
  return (
    <PopupWithForm
      name="editAvatarForm"
      title="Обновить аватар"
      isValid={formIsValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
    >
      <fieldset className="popup__input-container">
        <input
          type="url"
          className="popup__input"
          name="avatar"
          ref={avatarRef}
          placeholder="Ссылка на аватар"
          onInput={handleInput}
          required
        />
        <span
          className={`popup__error ${
            !validationMessage ? "" : "popup__error_visible"
          }`}
        >
          {validationMessage}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
