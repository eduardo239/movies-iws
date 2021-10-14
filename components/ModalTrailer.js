import Image from 'next/image';
import checkIcon from '../assets/eva_checkmark-circle-2-outline.svg';
import alertIcon from '../assets/eva_alert-circle-outline.svg';

export default function ModalTrailer({ trailer_id, setModal, modal }) {
  const handleClickOutside = (e) => {
    let tar = e.target;
    let cur = e.currentTarget;
    if (tar === cur) setModal(false);
  };

  return (
    <section
      className="modal modal-trailer"
      style={{ display: `${modal ? 'flex' : 'none'}` }}
      onClick={handleClickOutside}
    >
      <div className="">
        {trailer_id && (
          <iframe
            width="684"
            height="386"
            src={`http://www.youtube.com/embed/${trailer_id}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  );
}

//   return (
//     <div
//       style={{ display: `${modal ? 'flex' : 'none'}` }}
//       className={`modal-container`}
//       onClick={handleClickOutside}
//     >
//       <div className="modal-body">
//         <IconOnly secondary className="close" onClick={() => setModal(!modal)}>
//           <Close16 />
//         </IconOnly>
//         {/* <Spinner></Spinner> */}
//         {children}
//       </div>
//     </div>
//   );
// };
