import Image from 'next/image';
import checkIcon from '../assets/eva_checkmark-circle-2-outline.svg';
import alertIcon from '../assets/eva_alert-circle-outline.svg';

export default function ModalTrailer({ trailer_id }) {
  console.log(trailer_id);
  return (
    <section className="modal modal-trailer">
      <div className="video-container">
        <iframe
          width="684"
          height="386"
          src={`//www.youtube.com/embed/${trailer_id}?rel=0`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
