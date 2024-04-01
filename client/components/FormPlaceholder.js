import React from "react";

import FormExplanation from "./FormExplanation";
import SampleSearchTerms from "./SampleSearchTerms";

const ImportantIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-10 h-10 mr-3'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
    />
  </svg>
);

const FormPlaceholder = () => (
  <div className='bg-primary-300 w-1/2 h-3/4 absolute left-14 top-28 flex flex-col items-center pb-4'>
    <div className='bg-accent-800 w-full h-1/5 flex text-center items-center justify-center'>
      <ImportantIcon />
      <p className='text-heading2 text-primary-300'>
        How To Create Your Own Voronoi
      </p>
    </div>
    <div className='w-4/5 mt-2'>
      <FormExplanation textStyles='text-paragraph2 text-accent-800 leading-7' />
    </div>
    <div className='w-3/5 bg-accent-800 h-2/5'>
      <p className='text-primary-300 text-paragraph text-center mt-1'>
        Sample Search Terms
      </p>
      <SampleSearchTerms />
    </div>
  </div>
);

export default FormPlaceholder;
