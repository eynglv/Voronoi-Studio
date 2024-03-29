import React from 'react';

class Navbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <nav
        id='nav'
        className='top-0 nav  mx-auto d-flex flex-column position-fixed'
      >
        {' '}
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
          <a href='womenbywomen' className='mx-auto links-text'>
            Women by Women
          </a>
          <a href='womenbymen' className='mx-auto links-text'>
            Women by Men
          </a>
          <a href='highlighted-american' className='mx-auto links-text'>
            American Highlights
          </a>
          <a href='highlighted-underrepresented' className='mx-auto links-text'>
            Non-Western Highlights
          </a>
          <a href='voronoi-form' className='mx-auto links-text'>
            Create Your Own Voronoi
          </a>
          <a href='works-cited' className='mx-auto links-text'>
            Works Cited
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
