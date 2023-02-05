import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [nameIsValid, setNameIsValid] = React.useState(false);
  const [nameValidationMessage, setNameValidationMessage] = React.useState("");
  const [linkIsValid, setLinkIsValid] = React.useState(false);
  const [linkValidationMessage, setLinkValidationMessage] = React.useState("");
  //очистим поля при закрытии формы
  React.useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
      setNameIsValid(true);
      setLinkIsValid(true);
      setLinkValidationMessage("");
      setNameValidationMessage("");
    } else {
      setNameIsValid(false);
      setLinkIsValid(false);
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleNameInput(e) {
    setNameIsValid(e.target.validity.valid);
    setNameValidationMessage(
      e.target.validity.valid ? "" : e.target.validationMessage
    );
  }
  function handleLinkInput(e) {
    setLinkIsValid(e.target.validity.valid);
    setLinkValidationMessage(
      e.target.validity.valid ? "" : e.target.validationMessage
    );
  }
  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: name,
      link: link,
    });
  }
  return (
    <PopupWithForm
      name="addCardForm"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      loadingButtonText="Сохранение..."
      isValid={nameIsValid && linkIsValid}
    >
      <fieldset className="popup__input-container">
        <input
          type="text"
          className="popup__input"
          name="name"
          placeholder="Название"
          value={name || ""}
          onInput={handleNameInput}
          onChange={handleNameChange}
          minLength="2"
          maxLength="30"
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
          type="url"
          className="popup__input"
          name="link"
          placeholder="Ссылка на картинку"
          value={link || ""}
          onInput={handleLinkInput}
          onChange={handleLinkChange}
          required
        />
        <span
          className={`popup__error ${
            !linkValidationMessage ? "" : "popup__error_visible"
          }`}
        >
          {linkValidationMessage}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
