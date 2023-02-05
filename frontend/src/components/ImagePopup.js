import React from 'react';

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={
        isOpen ? `popup ppopup_ispicture popup_opened` : `popup popup_ispicture`
      }
      aria-label="форма просмотра фото"
      onClick={onClose}
    >
      {isOpen && (
        <div className="popup__container popup__container_ispicture">
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
          <img className="popup__big-photo" src={card.link} alt={card.name} />
          <p className="popup__picture-title nooverflow-block">{card.name}</p>
        </div>
      )}
    </section>
  );
}
