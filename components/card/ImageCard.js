/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import poster_default from '../../assets/poster.png';
import Placeholder from '../../components/Placeholder';
import ModalTrailer from '../../components/ModalTrailer';
import ModalMessage from '../../components/ModalMessage';

export default function Image({ children, content }) {
  const [modal, setModal] = useState(false);
  const [trailerId, setTrailerId] = useState('');
  const [message, setMessage] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  // async function showTrailer(id) {
  //   const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=pt-BR`;

  //   const response = await fetch(url);
  //   const json = await response.json();
  //   const key = json.results[0]?.key;

  //   if (key) {
  //     setTrailerId(key);
  //     setModal(!modal);
  //   } else {
  //     setMessage({
  //       show: true,
  //       message: 'Trailer não encontrado, redirecionando para o youtube.',
  //       type: 'warning',
  //     });
  //     setTimeout(() => {
  //       setMessage({ show: false, message: '', type: 'success' });
  //       const yUrl = `https://www.youtube.com/results?search_query=trailer+${
  //         content.original_title
  //           ? content.original_title
  //           : content.original_name
  //           ? content.original_name
  //           : null
  //       }`;

  //       window.open(yUrl, '_blank').focus();
  //     }, 2000);
  //     // popup youtube
  //   }
  // }

  return (
    <>
      {message.show && (
        <ModalMessage message={message.message} type={message.type} />
      )}
      {modal && (
        <ModalTrailer
          trailer_id={trailerId}
          modal={modal}
          setModal={setModal}
        ></ModalTrailer>
      )}
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
        <div className="flex-column flex-1 gap-5 p-5">
          <div className="flex-1">
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
          {children}
        </div>
      </div>
    </>
  );
}
