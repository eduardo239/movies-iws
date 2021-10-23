/* eslint-disable @next/next/no-img-element */
import ImageCardTrailer from './ImageCardTrailer';
import Masonry from 'react-masonry-css';
import { breakpointColumnsObj } from '../utils/constants';
import closeIcon from '../assets/eva_close-outline.svg';

export default function ModalSearch({ toggleModal, show, children, data }) {
  const showHideClassName = show ? 'modal-open' : 'modal-close';

  const handleClickOutside = (e) => {
    let tar = e.target;
    let cur = e.currentTarget;
    if (tar === cur) toggleModal(false);
  };

  return (
    <div
      className={`modal-search ${showHideClassName}`}
      onClick={handleClickOutside}
    >
      <section className="modal-main">
        <div className="flex-center mb-20">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data?.map((x) => (
              <ImageCardTrailer key={x.id} content={x}></ImageCardTrailer>
            ))}
          </Masonry>
        </div>
        <div className="flex-center mb-20">
          <button className="btn-icon btn-primary" onClick={toggleModal}>
            <img src={closeIcon.src} alt="Trailer" />
            close
          </button>
        </div>
      </section>
    </div>
  );
}
