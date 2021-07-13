import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

class Navbar extends React.Component {
constructor() {
  super()
  
}
  render() {
    return (
      <nav id="nav" className="nav-flex-column">
      <a href="main" className="links-text">Home</a>
      <a href="womenbywomen" className="links-text">Women by Women</a>
      <a href="womenbymen" className="links-text">Women by Men</a>
      <a href="highlighted-american" className="links-text">American Highlights</a>
      <a href="highlighted-underrepresented" className="links-text">Unusual Highlights</a>
      <a href="featured-pieces" className="links-text">Featured Art pieces</a>
      <a href="voronoi-form" className="links-text">Create your own voronoi</a>
      </ nav>
  )
    }
}

export default Navbar;
