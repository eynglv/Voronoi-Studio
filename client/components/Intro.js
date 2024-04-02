import React, { forwardRef, useRef, useImperativeHandle } from "react";

const Intro = forwardRef((props, ref) => {
  const div = useRef(null);

  useImperativeHandle(ref, () => ({
    div,
  }));
  return (
    <div className='w-56 border-2 mx-auto' ref={div}>
      <p className='text-paragraph'>Scroll down to view our digital essay.</p>
      <p className='text-paragraph'>
        Any of the moving images can be clicked on for more detail.
      </p>
      <p className='text-paragraph'>Scroll to Continue.</p>
    </div>
  );
});

export default Intro;
