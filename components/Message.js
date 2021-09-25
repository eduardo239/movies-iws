export default function Message({ type = 'success', message }) {
  return (
    <section
      className={`alert ${
        type === 'success'
          ? 'alert-success'
          : type === 'danger'
          ? 'alert-danger'
          : type === 'warning'
          ? 'alert-warning'
          : ''
      }`}
    >
      {message}
    </section>
  );
}
