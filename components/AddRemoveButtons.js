/* eslint-disable @next/next/no-img-element */
import eye from '../assets/eva_eye-outline.svg';
import calendar from '../assets/eva_calendar-outline.svg';

export default function AddRemoveButtons({
  watchedOK,
  toSeeOK,
  addMovie,
  removeMovie,
}) {
  return (
    <>
      {!watchedOK ? (
        <button
          onClick={() => addMovie(0)}
          className={`btn-icon ${watchedOK ? 'btn-secondary' : 'btn-primary'}`}
        >
          <img src={eye.src} alt="Já vi" width="24" height="24" />
          Já vi
        </button>
      ) : (
        <button
          onClick={() => removeMovie(0)}
          className={`btn-icon ${watchedOK ? 'btn-secondary' : 'btn-primary'}`}
        >
          <img src={eye.src} alt="Já vi" width="24" height="24" />
          Remover
        </button>
      )}
      {!toSeeOK ? (
        <button
          onClick={() => addMovie(1)}
          className={`btn-icon ${toSeeOK ? 'btn-secondary' : 'btn-primary'}`}
        >
          <img src={calendar.src} alt="Vou ver" width="24" height="24" />
          Vou ver
        </button>
      ) : (
        <button
          onClick={() => removeMovie(1)}
          className={`btn-icon ${toSeeOK ? 'btn-secondary' : 'btn-primary'}`}
        >
          <img src={calendar.src} alt="Vou ver" width="24" height="24" />
          Remover
        </button>
      )}
    </>
  );
}
