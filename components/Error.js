export default function Error({ type, message }) {
  return (
    <div
      className={`message ${
        type === 'error'
          ? 'message-error'
          : type === 'success'
          ? 'message-success'
          : type === 'warning'
          ? 'message-warning'
          : ''
      }`}
    >
      {message}
    </div>
  );
}
