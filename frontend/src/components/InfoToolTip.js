export default function InfoToolTip({ name, src, text, isOpen, onClose }) {
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
        <img className="popup__icon" src={src} alt={text}></img>
        <span className="popup__tooltip-text">{text}</span>
      </div>
    </section>
  );
}
