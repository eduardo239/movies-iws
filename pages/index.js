import Error from '../components/Error';
import Spinner from '../components/Spinner';
import useFetch from '../utils/useFetch';
import Image from 'next/image';
import Link from 'next/link';
import Search from '../components/Search';
import { useState } from 'react';
import poster_default from '../assets/p.png';

export default function Home({}) {
  const [opacity, setOpacity] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
  );
  if (data) console.log(data);
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="flex-center">
      <div>
        <Search setOpacity={setOpacity}></Search>
        <h1 className="text-center">Filmes Popular</h1>
        <div className={`flex-0  mb-20 ${opacity ? 'opacity-20' : ''}`}>
          {data.results.map((m) => (
            <div key={m.id} className="movie-item">
              <Link href={`/movie/${m.id}`} passHref>
                <a>
                  <Image
                    width="140"
                    height="210"
                    alt={m.original_title}
                    src={`${
                      m.poster_path
                        ? 'http://image.tmdb.org/t/p/w185' + m.poster_path
                        : poster_default.src
                    }`}
                  />
                  <span>{m.original_title}</span>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-0 mb-20">
          <button
            className="btn btn-300"
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || page < 1}
          >
            anterior
          </button>
          <button className="btn btn-300" onClick={() => setPage(page + 1)}>
            próximo
          </button>
        </div>
      </div>

      {/* <br />
      <br />
      <br />
      <br />
      <button className="btn btn-primary btn-100">Login</button>
      <button className="btn btn-primary btn-200">Login</button>
      <button className="btn btn-primary btn-300">Login</button>
      <button className="btn btn-secondary">Register</button>

      <button className="btn-icon btn-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#dfdfdf"
          className="bi bi-sun"
          viewBox="0 0 16 16"
        >
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </svg>
        button
      </button>

      <button className="btn-icon btn-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-shield-lock"
          viewBox="0 0 16 16"
        >
          <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
          <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
        </svg>
        button
      </button>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>

      <div>
        <h1>Lorem, ipsum dolor.</h1>
        <h2>Lorem, ipsum dolor.</h2>
        <h3>Lorem, ipsum dolor.</h3>
        <h4>Lorem, ipsum dolor.</h4>
        <h5>Lorem, ipsum dolor.</h5>
        <h6>Lorem, ipsum dolor.</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem aliquid velit dolor similique eum tenetur amet quod nam
          illum. Repellendus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem aliquid velit dolor similique eum tenetur amet quod nam
          illum. Repellendus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem aliquid velit dolor similique eum tenetur amet quod nam
          illum. Repellendus?
        </p>

        <small>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
          maiores?
        </small>
      </div> */}
    </section>
  );
}
