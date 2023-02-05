import React from "react";
export default function FormWithPassword({
  buttonText,
  name,
  onSubmit,
  header,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="form-for-password">
      <h1 className="form-for-password__header">{header}</h1>
      <form
        name={name}
        className="form-for-password__form"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="form-for-password__input"
          name="email"
          value={email || ""}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <span className="form-for-password__error"></span>
        <input
          type="password"
          className="form-for-password__input"
          name="password"
          value={password || ""}
          onChange={handlePasswordChange}
          placeholder="Пароль"
          required
        />
        <span className="form-for-password__error"></span>
        <button type="submit" className="form-for-password__button">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
