import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card,
  onCardClick,
  onLikeClick,
  onDeleteClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__heart_active" : ""
  }`;

  function handleImageClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onLikeClick(card);
  }
  function handleDeleteClick() {
    onDeleteClick(card);
  }
  return (
    <>
      {!isOwn || (
        <button
          className={"element__delete"}
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div
        className="element__image-container"
        role="img"
        style={{ backgroundImage: `url(${card.link ?? "#"})` }}
        onClick={handleImageClick}
      ></div>
      <div className="element__title">
        <h2 className="element__title-text nooverflow-block" title="">
          {card.name ?? "Картинка без названия"}
        </h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__likes-count">
            {card.likes?.length ?? 0}
          </span>
        </div>
      </div>
    </>
  );
}
