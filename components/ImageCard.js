import LazyLoad from 'react-lazyload';
import addIcon from '../assets/eva_plus-circle-outline.svg';

export default function Image({ poster_default, image, alt, title }) {
  return (
    <div className="card-item">
      <div className="card-item__poster-div">
        <LazyLoad height={278} once placeholder={poster_default.src}>
          <img className="card-item__poster" src={image} alt={alt} />
        </LazyLoad>
      </div>
      <div className="flex-column gap-5 p-5">
        <span>{title}</span>
        <button className="btn-icon btn-primary w-100">
          <img src={addIcon.src} />
          Lista
        </button>
        <button className="btn btn-secondary w-100">trailer</button>
      </div>
    </div>
  );
}
