import LazyLoad from 'react-lazyload';
import addIcon from '../assets/eva_plus-circle-outline.svg';
import Link from 'next/link';
import poster_default from '../assets/poster.png';
import Placeholder from './Placeholder';

export default function Image({ showTrailer = false, content }) {
  return (
    <div className="card-item">
      <Link href={`/movie/${content.id}`} passHref>
        <a>
          <div className="card-item__poster-div">
            <LazyLoad
              offset={100}
              height={275}
              once
              placeholder={<Placeholder />}
            >
              <img
                className="card-item__poster"
                src={`${
                  content.poster_path
                    ? 'http://image.tmdb.org/t/p/w185' + content.poster_path
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
            </LazyLoad>
          </div>
        </a>
      </Link>
      <div className="flex-column gap-5 p-5">
        <div>
          <span>
            {content.original_title
              ? content.original_title
              : content.original_name
              ? content.original_name
              : `none`}
          </span>
          <small>
            {content.year && content.year.length > 4
              ? content.year.substring(0, 4)
              : ''}
          </small>
        </div>
        <button className="btn-icon btn-primary w-100">
          <img src={addIcon.src} />
          Lista
        </button>
        <button
          className="btn btn-secondary w-100"
          onClick={() => showTrailer(content.id)}
        >
          trailer
        </button>
      </div>
    </div>
  );
}
