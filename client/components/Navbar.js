import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHistory, Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

{
  /* <nav
id='nav'
className='top-0 nav  mx-auto d-flex flex-column position-fixed'
>
<span className='material-icons'>fingerprint</span>
<div className='menu flex-grow-1 d-flex flex-column justify-content-around'>
  <a href='/' className='mx-auto links-text'>
    Home
  </a>
  <a href='main' className='mx-auto links-text'>
    Visual Essay
  </a>
  <a href='all' className='mx-auto links-text'>
    Featured Art Pieces
  </a>
  <a href='voronoi-form' className='mx-auto links-text'>
    Create Your Own Voronoi
  </a>
  <a href='works-cited' className='mx-auto links-text'>
    Works Cited
  </a>
</div>
</nav> */
}

const Navbar = () => {
  const history = useHistory();

  return (
    <Menu as='div' className='fixed left-10 top-5 z-50'>
      <Menu.Button className='inline-flex justify-center items-center w-full px-4 h-12 bg-accent-900/70 rounded-md hover:bg-accent-950/70 focus:outline-none'>
        More
        <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute left-0 w-56 p-2 origin-top-right rounded-md bg-accent-950 shadow-lg ring-2 ring-primary-50/5 focus:outline-none'>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active
                      ? "bg-accent-800 text-primary-50"
                      : "text-primary-900 bg-primary-200"
                  } group flex w-full items-center rounded-md px-3 py-2 text-sm z-50`}
                  to='/'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 mr-3'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                    />
                  </svg>
                  Home
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active
                      ? "bg-accent-800 text-primary-50"
                      : "text-primary-900 bg-primary-200"
                  } group flex w-full items-center rounded-md px-3 py-2 text-sm hover:text-primary-900`}
                  to='/voronoi-form'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 '
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z'
                    />
                  </svg>
                  Create Your Own Voronoi
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active
                      ? "bg-accent-800 text-primary-50"
                      : "text-primary-900 bg-primary-200"
                  } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                  to='/works-cited'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                    />
                  </svg>
                  Works Cited
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Navbar;
