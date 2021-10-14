/* eslint-disable @next/next/no-img-element */
import checkIcon from '../assets/eva_checkmark-circle-2-outline.svg';
import alertIcon from '../assets/eva_alert-circle-outline.svg';
import warningIcon from '../assets/eva_alert-circle-outline.svg';

export default function ModalMessage({ message, type }) {
  if (type === 'warning')
    return (
      <section className="modal modal-warning">
        <div className="modal-message__warning">
          <img src={warningIcon.src} alt="Message" width="24" height="24" />
          {message}
        </div>
      </section>
    );
  if (type === 'success')
    return (
      <section className="modal modal-message">
        <div className="modal-message__success">
          <img src={checkIcon.src} alt="Message" width="24" height="24" />
          {message}
        </div>
      </section>
    );
  if (type === 'alert')
    return (
      <section className="modal modal-message">
        <div className="modal-message__alert">
          <img src={alertIcon.src} alt="Message" width="24" height="24" />
          {message}
        </div>
      </section>
    );
  return null;
}
