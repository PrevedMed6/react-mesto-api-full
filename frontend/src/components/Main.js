import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardElements = cards.map((card) => (
    <li className="element" key={card._id}>
      <Card
        card={card}
        onCardClick={onCardClick}
        onLikeClick={onCardLike}
        onDeleteClick={onCardDelete}
      />
    </li>
  ));
  return (
    <main className="main">
      <section className="profile centred-block">
        <div className="profile__info">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img
              className="profile__avatar-picture"
              src={currentUser.avatar}
              alt="Аватар"
            />
          </div>
          <div className="profile__text">
            <div className="profile__name">
              <h1 className="profile__title nooverflow-block">
                {currentUser.name}
              </h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__job nooverflow-block">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-photo"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements centred-block" aria-label="Фотогалерея">
        <ul className="elements__grid">{cardElements}</ul>
      </section>
    </main>
  );
}
