import React from "react";

const FormExplanation = ({ textStyles }) => (
  <ul style={{ listStyle: "disc" }}>
    <li className={textStyles} listStyle='square'>
      Entering a search term is required.
    </li>
    <li className={textStyles}>
      You may search items by a tag or by an artist or culture.{" "}
      <span className={`${textStyles} italic`}>
        Note that searching by "artist or culture" means you may search by AN
        artist or A culture.
      </span>
    </li>
    <li className={textStyles} listStyle='square'>
      Selecting both the "highlighted artworks" and "female artists only"
      options will not likely yield many results.
    </li>
    <li className={textStyles}>
      The location search term must be capitalized.
    </li>
    <li className={textStyles}>
      Once your voronoi is created, you can directly change its cell count! Try
      it out!
    </li>
    <li className={textStyles}>
      Don't forget to click on the voronoi cells to view your query results!
    </li>
  </ul>
);

export default FormExplanation;
