/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import chart from "./pulsate";
import axios from "axios";

export default (props) => {
  const [paintings, setPaintings] = useState([]);
  useEffect(() => {
    const getPaintings = async () => {
      const voronoiPaintings = (
        await axios.get(`/api/voronois/${props.voronoiId}`)
      ).data;
      setPaintings(voronoiPaintings);
    };
    getPaintings();
  }, []);
  useEffect(() => {
    if (paintings.length) {
      const voronoiRender = chart.render("#single-voronoi", paintings);
      const interval = setInterval(() => voronoiRender.next(), 8);
      return () => clearInterval(interval);
    }
  }, [paintings]);
  return (
    <div>
      <div id="modal"></div>
      <h1 className="text-center display-3 mt-3">{props.voronoiId}</h1>
      <h3 className="text-center mb-2 mt-2">Curated by {props.curator}</h3>
      <canvas
        id="single-voronoi"
        className="mx-auto mb-3"
        width="1000"
        height="600"
      ></canvas>
      <h3 className="text-center mb-2 mt-2">
        To see more art from this population, check out the links below.
      </h3>
      {props.links.length > 0 ? (
        <div className="links-view">
          {props.links.map((link, i) => {
            return (
              <div className="citation-link text-center" key={i}>
                <a href={link}>{props.titles[i]}</a>
              </div>
            );
          })}
        </div>
      ) : (
        <p>""</p>
      )}
    </div>
  );
};
