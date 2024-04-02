import React, { forwardRef, useRef, useImperativeHandle } from "react";

const Intro = forwardRef((props, ref) => {
  const div = useRef(null);

  useImperativeHandle(ref, () => ({
    div,
  }));
  return (
    <div
      className='w-1/3 border-2 mx-auto p-3 text-center bg-primary-600'
      ref={div}
    >
      <p className='text-paragraph'></p>
      <p className='text-paragraph'>
        Click the individual cells to view details on the selected piece.
      </p>
      <p className='text-paragraph'>Scroll to Continue.</p>
    </div>
  );
});

export default Intro;
