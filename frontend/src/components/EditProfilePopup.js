import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);
  const [nameIsValid, setNameIsValid] = React.useState(true);
  const [nameValidationMessage, setNameValidationMessage] = React.useState("");
  const [aboutIsValid, setAboutIsValid] = React.useState(true);
  const [aboutValidationMessage, setAboutValidationMessage] =
    React.useState("");

  React.useEffect(() => {
    if (!isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setNameIsValid(true);
      setAboutIsValid(true);
      setAboutValidationMessage("");
      setNameValidationMessage("");
    }
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }
  function handleNameInput(e) {
    setNameIsValid(e.target.validity.valid);
    setNameValidationMessage(
      e.target.validity.valid ? "" : e.target.validationMessage
    );
  }
  function handleAboutInput(e) {
    setAboutIsValid(e.target.validity.valid);
    setAboutValidationMessage(
      e.target.validity.valid ? "" : e.target.validationMessage
    );
  }

  return (
    <PopupWithForm
      name="editForm"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Отправить"
      loadingButtonText="Сохранение..."
      isValid={nameIsValid && aboutIsValid}
    >
      <fieldset className="popup__input-container">
        <input
          type="text"
          className="popup__input"
          name="name"
          value={name || ""}
          onInput={handleNameInput}
          onChange={handleNameChange}
          placeholder="Как вас зовут?"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          className={`popup__error ${
            !nameValidationMessage ? "" : "popup__error_visible"
          }`}
        >
          {nameValidationMessage}
        </span>
        <input
          type="text"
          className="popup__input"
          name="job"
          value={description || ""}
          onInput={handleAboutInput}
          onChange={handleDescriptionChange}
          placeholder="Чем вы занимаетесь?"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className={`popup__error ${
            !aboutValidationMessage ? "" : "popup__error_visible"
          }`}
        >
          {aboutValidationMessage}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
