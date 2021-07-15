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
          (val) => val.artistGender === "Female"
        );
      if (!artDataHolder.length)
        setErrorMessage("No results! Please change your search query!");
      console.log(artDataHolder);
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
          720,
          1080,
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
    <div className="d-flex min-vh-100 flex-row">
      <div className="mx-auto ms-2 me-2 d-flex justify-content-end flex-column">
        <h2 className="CYO fs-2 text-center mx-auto mt-5">
          Create Your Own Voronoi
        </h2>
        <form
          id="new-voronoi-form"
          className="mx-auto fs-7 p-4 d-flex flex-column flex-grow-1 justify-content-around"
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
          <span>
            <label
              className="text-center mx-auto form-label"
              htmlFor="highlight"
            >
              Show only highlighted works
            </label>{" "}
            <input
              name="highlight"
              type="checkbox"
              className=""
              value={highlight}
              onChange={() => setHighlight(!highlight)}
              checked={highlight}
            />
          </span>
          <span>
            {" "}
            <label className="form-label mx-auto" htmlFor="femaleArtist">
              Show only works by female artists
            </label>{" "}
            <input
              name="femaleArtist"
              type="checkbox"
              value={femaleArtist}
              onChange={() => setFemaleArtist(!femaleArtist)}
              checked={femaleArtist}
            />
          </span>

          <div
            className=""
            onChange={() => {
              setArtistOrCulture(!artistOrCulture);
              setTags(!tags);
            }}
          >
            <p className="">
              Search by Artist & Culture or by Tags: <br></br>{" "}
              <span>
                <input
                  type="radio"
                  id="artistCulture"
                  name="culture-or-tags"
                  value="artistOrCulture"
                />{" "}
                <label htmlFor="artistCulture">Artist and Culture</label>{" "}
                <input
                  type="radio"
                  id="tags"
                  name="culture-or-tags"
                  value="tags"
                  className="bs-pink"
                  defaultChecked
                />{" "}
                <label htmlFor="tags">Tags</label>
              </span>
            </p>
          </div>
          <span className="d-flex justify-content-end">
            <label className="align-self-center me-3" htmlFor="department">
              Filter to Department
            </label>
            <select
              name="department"
              id="department"
              className="w-50"
              value={`${departmentId}`}
              onChange={(evt) =>
                setDepartmentId(parseInt(evt.target.value, 10))
              }
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
          <div className="d-flex justify-content-end">
            <label className="me-3 align-self-center" htmlFor="location">
              Location
            </label>
            <input
              className="w-50"
              type="text"
              id="location"
              value={location}
              onChange={(evt) => setLocation(evt.target.value)}
              placeholder="any"
            />
          </div>
          <div className="d-flex justify-content-end">
            <label className="align-self-center me-3" htmlFor="query">
              Search Term
            </label>
            <input
              type="text"
              className="w-50"
              id="query"
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <label className="align-self-center me-3" htmlFor="cell-count">
              Number of Cells
            </label>
            <input
              className="w-50"
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
          </div>
          <p className="align-self-end">
            (too many cells can impact performance)
          </p>
          <button type="submit">Create Voronoi!</button>
        </form>
        {errorMessage ? <p>{errorMessage}</p> : ""}
      </div>
      <canvas
        id="user-generated"
        className="flex-grow-1 mx-4 my-auto"
        height="600"
        width="900"
      ></canvas>
    </div>
  );
};
