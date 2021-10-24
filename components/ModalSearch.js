/* eslint-disable @next/next/no-img-element */
import ImageCardTrailer from './ImageCardTrailer';
import Masonry from 'react-masonry-css';
import { breakpointColumnsObj } from '../utils/constants';
import closeIcon from '../assets/eva_close-outline.svg';
import Link from 'next/link';
import poster_default from '../assets/poster.png';

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
            {data?.slice(0, 9).map((content) => (
              <div className="card-item" key={content.id}>
                <Link href={`/movie/${content.id}`} passHref>
                  <a>
                    <div className="card-item__poster-div">
                      <img
                        className="card-item__poster"
                        src={`${
                          content.poster_path
                            ? 'http://image.tmdb.org/t/p/w185' +
                              content.poster_path
                            : poster_default.src
                        }`}
                        alt={
                          content.original_title
                            ? content.original_title
                            : content.original_name
                            ? content.original_name
                            : `none`
                        }
                      />
                    </div>
                  </a>
                </Link>
              </div>
            ))}
            <div className="flex-center mb-20">
              <button className="btn-icon btn-primary" onClick={toggleModal}>
                <img src={closeIcon.src} alt="Trailer" />
                close
              </button>
            </div>
          </Masonry>
        </div>
      </section>
    </div>
  );
}
