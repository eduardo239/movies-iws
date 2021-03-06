/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import poster_default from '../assets/poster-movie-list.jpg';
import Placeholder from './Placeholder';
import subIcon from '../assets/eva_minus-circle-outline.svg';

export default function MovieListItem({ content, removeItem }) {
  return (
    <div className="movie-list mb-2">
      <div className="movie-list__poster">
        <Link href={`/movie/${content.id}`} passHref>
          <a>
            <LazyLoad
              offset={100}
              height={275}
              once
              placeholder={<Placeholder />}
            >
              <img
                className="movie-list__poster-img"
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
          </a>
        </Link>
      </div>
      {/*  */}
      <div className="movie-list__main">
        <div className="flex-1">
          <Link href={`/movie/${content.id}`} passHref>
            <a>
              <h4 className="mb-2">
                {content?.title ? content.title : content.original_name}
              </h4>
            </a>
          </Link>
          <p style={{ margin: 0 }}>
            {content?.overview.substring(0, 80) ?? ''}...
          </p>
        </div>
        <div style={{ marginLeft: '.5rem' }}>
          <div>
            <small>{content?.release_date.split('-')[0]}</small>
          </div>
          <div>
            <button
              onClick={() => removeItem(content, 2)}
              className="btn-icon-only btn-secondary w-100"
            >
              <img src={subIcon.src} alt="Search" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
