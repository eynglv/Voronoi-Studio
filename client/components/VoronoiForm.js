import React, { useEffect, useState } from "react";
import axios from "axios";
const MAX = 10;
import chart from "./pulsate";

export default () => {
  const [highlight, setHighlight] = useState(true);
  const [tags, setTags] = useState(true);
  const [departmentId, setDepartmentId] = useState(0);
  const [location, setLocation] = useState("");
  const [artistOrCulture, setArtistOrCulture] = useState(false);
  const [query, setQuery] = useState("");
  const [femaleArtist, setFemaleArtist] = useState(false);
  const [numberOfCells, setNumberOfCells] = useState(10);
  const [search, setSearch] = useState({});
  const [artData, setArtData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const getVoronoi = async (route) => {
    try {
      const artList = (await axios.get(route)).data.objectIDs;

      const artData = await Promise.all(
        artList.map(async (artId) => {
          //if more than 79 results, need to add a time out to wait 1 second
          const artPiece = (
            await axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`
            )
          ).data;
          const artObj = {
            objectId: artId,
            title: artPiece.title,
            artistDisplayName: artPiece.artistDisplayName,
            artistGender: artPiece.artistGender,
            primaryImage: artPiece.primaryImage,
            primaryImageSmall: artPiece.primaryImageSmall,
            endDate: artPiece.objectEndDate,
            country: artPiece.country,
            culture: artPiece.culture,
            isHighlight: artPiece.isHighlight,
            isPublicDomain: artPiece.isPublicDomain,
          };
          return artObj;
        })
      );

      return artData;
    } catch (err) {
      setErrorMessage("No results! Please change your search query!");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setErrorMessage("");
      const route = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings${
        highlight ? "&isHighlight=true" : ""
      }${tags ? "&tags=true" : ""}${
        artistOrCulture ? "&artistOrCulture=true" : ""
      }${departmentId ? `&departmentId=${departmentId}` : ""}${
        location ? `&geoLocation=${location.replaceAll(" ", "|")}` : ""
      }&q=${query.replaceAll(" ", "%20")}`;
      let artDataHolder = await getVoronoi(route);
      if (femaleArtist)
        artDataHolder = artDataHolder.filter(
          (val) => val.artistGender === "female"
        );
      if (!artDataHolder.length)
        setErrorMessage("No results! Please change your search query!");

      setArtData(artDataHolder);
    };
    if (search.query) {
      fetchData();
    }
  }, [search]);
  useEffect(() => {
    try {
      if (artData.length > 1) {
        //only render a canvas if we have artData. Otherwise, we will just have a black box
        const chartRender = chart.render(
          "#user-generated",
          600,
          900,
          artData,
          numberOfCells
        );
        const interval = setInterval(() => chartRender.next(), 10);
        setErrorMessage("");
        return () => clearInterval(interval);
      } else if (artData.length === 1) {
        setErrorMessage("Only one result, please relax search terms");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("No results! Please change your search query!");
    }
  }, [artData, numberOfCells]);

  return (
    <div className="mx-auto row">
      <h2 className="display-5 text-center mt-5">Create Your Own Voronoi</h2>
      <form
        id="new-voronoi-form"
        className="mx-auto w-50"
        onSubmit={(evt) => {
          evt.preventDefault();
          setSearch({
            query,
            highlight,
            tags,
            artistOrCulture,
            departmentId,
            location,
            femaleArtist,
          });
        }}
      >
		<div className="row row-cols-auto">
        <label className="text-center mx-auto form-label" htmlFor="highlight">
          Show only highlighted works
        </label>
        <input
          name="highlight"
          type="checkbox"
          className=""
          value={highlight}
          onChange={() => setHighlight(!highlight)}
          checked={highlight}
        />
        <label className="form-label mx-auto" htmlFor="femaleArtist">
          Show only works by female artists
        </label>
        <input
          name="femaleArtist"
          type="checkbox"
          value={femaleArtist}
          onChange={() => setFemaleArtist(!femaleArtist)}
          checked={femaleArtist}
        />
		</div>
        <div className="row row-cols"
          onChange={() => {
            setArtistOrCulture(!artistOrCulture);
            setTags(!tags);
          }}
        >
          <p className="">
            Search by Artist & Culture or by Tags:{" "}
            <span>
              <input
                type="radio"
                id="artistCulture"
                name="culture-or-tags"
                value="artistOrCulture"
              />
              <label htmlFor="artistCulture">Artist and Culture</label>
              <input
                type="radio"
                id="tags"
                name="culture-or-tags"
                value="tags"
                defaultChecked
              />
              <label htmlFor="tags">Tags</label>
            </span>
          </p>
        </div>
        <span className="row row-cols-auto">
          <label htmlFor="department">Filter to Department:</label>
          <select
            name="department"
            id="department"
            value={`${departmentId}`}
            onChange={(evt) => setDepartmentId(parseInt(evt.target.value, 10))}
          >
            <option value="0">Any</option>
            {[
              {
                departmentId: 1,
                displayName: "American Decorative Arts",
              },
              {
                departmentId: 3,
                displayName: "Ancient Near Eastern Art",
              },
              {
                departmentId: 5,
                displayName: "Arts of Africa, Oceania, and the Americas",
              },
              {
                departmentId: 6,
                displayName: "Asian Art",
              },
              {
                departmentId: 7,
                displayName: "The Cloisters",
              },
              {
                departmentId: 10,
                displayName: "Egyptian Art",
              },
              {
                departmentId: 11,
                displayName: "European Paintings",
              },
              {
                departmentId: 13,
                displayName: "Greek and Roman Art",
              },
              {
                departmentId: 14,
                displayName: "Islamic Art",
              },
              {
                departmentId: 15,
                displayName: "The Robert Lehman Collection",
              },
              {
                departmentId: 16,
                displayName: "The Libraries",
              },
              {
                departmentId: 17,
                displayName: "Medieval Art",
              },
              {
                departmentId: 21,
                displayName: "Modern Art",
              },
            ].map((val) => (
              <option value={`${val.departmentId}`} key={val.departmentId}>
                {val.displayName}
              </option>
            ))}
          </select>
        </span>
		<br/>
		<div className="row row-cols-auto"><label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(evt) => setLocation(evt.target.value)}
          placeholder="any"
        /></div>
		<div className="row row-cols-auto">
		<label htmlFor="query">Search Term</label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
          required
        />
		</div>
        <label htmlFor="cell-count">
          Number of Cells (too many can impact performance)
        </label>
        <input
          type="number"
          id="cell-count"
          value={numberOfCells}
          min="3"
          step="1"
          onChange={(evt) => {
            let cellCount = evt.target.value;
            if (cellCount < 3) cellCount = 3;
            setNumberOfCells(cellCount);
          }}
        />
        <button type="submit">Create Voronoi!</button>
      </form>
      {errorMessage ? <p>{errorMessage}</p> : ""}
      <canvas
        id="user-generated"
        className="mt-5 mb-5"
        height="600"
        width="900"
      >
        This is your voronoi!
      </canvas>
    </div>
  );
};
