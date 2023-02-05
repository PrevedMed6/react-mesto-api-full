import React from "react";
import logoPath from "../image/logo.svg";
import { Link } from "react-router-dom";
export default function Header({
  linkText,
  linkLink,
  showExit,
  showEmail,
  myMail,
  logOut
}) {

  return (
    <header className="header centred-block">
      <img className="header__logo" alt="Логотип" src={logoPath} />
      <div className="header__actions">
        {showEmail && <span className="header__email">{myMail}</span>}
        {showExit ? (
          <button type="button" className="header__exit" onClick={logOut}>
            {linkText}
          </button>
        ) : (
          <Link className="header__navigation" to={linkLink || ""}>
            {linkText}
          </Link>
        )}
      </div>
    </header>
  );
}
