import React from "react";

import Navbar from "./Navbar";

export default () => {
  return (
    <div className='w-4/5 mx-auto'>
      <Navbar />
      <h1 className='text-center p-4 text-heading2'>Works Cited</h1>
      <p className='text-start text-paragraph p-3'>
        Cascone, Sarah. “In Response to Pressure From Within, the Metropolitan
        Museum of Art Has Released an Institutionwide Equity and Diversity
        Plan.” Artnet News, Artnet News, 7 July 2020,{" "}
        <u>
          <a
            href='https://news.artnet.com/art-world/met-racism-allegations-1892614'
            className='citation-link'
          >
            news.artnet.com/art-world/met-racism-allegations-1892614.
          </a>
        </u>{" "}
      </p>
      <p className='text-start text-paragraph p-3'>
        Churchouse, Clare. Gender at The Met,{" "}
        <u>
          <a
            href='https://churc.github.io/MajorStudio1/'
            className='citation-link'
          >
            churc.github.io/MajorStudio1/MetProjects/gender/
          </a>
        </u>
        .{" "}
      </p>
      <p className='text-start text-paragraph p-3'>
        <u>
          <a
            href='https://www.tate.org.uk/art/artworks/guerrilla-girls-do-women-have-to-be-naked-to-get-into-the-met-museum-p78793'
            className='citation-link'
          >
            “'Do Women Have To Be Naked To Get Into the Met. Museum?', Guerrilla
            Girls, 1989.”
          </a>
        </u>{" "}
        Guerilla Girls, 1 Jan. 1989,
        www.tate.org.uk/art/artworks/guerrilla-girls-do-women-have-to-be-naked-to-get-into-the-met-museum-p78793.{" "}
      </p>
      <p className='text-start text-paragraph p-3'>
        Weiss, Daniel H., and Max Hollein. “Our Commitments to Anti-Racism,
        Diversity, and a Stronger Community Daniel H. Weiss.” Metmuseum.org, 6
        July 2020,{" "}
        <u>
          <a
            href='https://www.metmuseum.org/blogs/now-at-the-met/2020/the-mets-plans-for-anti-racism'
            className='citation-link'
          >
            www.metmuseum.org/blogs/now-at-the-met/2020/the-mets-plans-for-anti-racism.
          </a>
        </u>{" "}
      </p>
      {/* <h1 className="text-start p-3">Tech Stack:</h1> */}
    </div>
  );
};
