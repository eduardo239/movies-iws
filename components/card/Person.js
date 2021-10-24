/* eslint-disable @next/next/no-img-element */
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import star from '../../assets/star.png';

export default function Person({ data }) {
  return (
    <section className="person">
      <Link href={`/person/${data.id}`} passHref>
        <a>
          <LazyLoad>
            <img
              src={`${
                data.profile_path
                  ? `http://image.tmdb.org/t/p/w342${data.profile_path}`
                  : star.src
              }`}
              alt={data.original_name}
              width="140"
              height="210"
            />
          </LazyLoad>
          <div className="person-main">
            <p className="p-small">{data.original_name}</p>
          </div>
        </a>
      </Link>
    </section>
  );
}
