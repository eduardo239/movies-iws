export default function MovieTrailer({ trailer_id }) {
  return (
    <section>
      <iframe
        width="684"
        height="386"
        src={`https://www.youtube.com/embed/${trailer_id}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </section>
  );
}
