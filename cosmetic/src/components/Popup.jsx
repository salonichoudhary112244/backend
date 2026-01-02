import "../styles/popup.css";

export default function Popup({ message, type, onClose }) {
  return (
    <div className={`popup ${type}`}>
      {message}
      <span onClick={onClose}>✖</span>
    </div>
  );
}
