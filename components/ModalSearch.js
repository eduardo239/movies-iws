import { useState } from 'react';
import ImageCardTrailer from './ImageCardTrailer';

export default function ModalSearch({ children, shown, close, data }) {
  return shown ? (
    <div
      className="modal-search"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className="modal-search-content"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {data?.results.map((x) => (
          <ImageCardTrailer key={x.id} content={x}></ImageCardTrailer>
        ))}
        {children}
      </div>
    </div>
  ) : null;
}
