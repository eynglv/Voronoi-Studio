import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import FormExplanation from "./FormExplanation";

const HowToDialog = ({ open, closeModal }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        open={open}
        className='relative z-10'
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-secondary-900 p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title className='text-heading2 text-primary-100'>
                  Tips For Creating Your Own Voronoi
                </Dialog.Title>
                <Dialog.Description>
                  <FormExplanation textStyles='text-paragraph2 text-primary-100 ml-2' />
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default HowToDialog;
