import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import chart from "./pulsate";
import HowToDialog from "./HowToDialog";
import Navbar from "./Navbar";
import FormPlaceholder from "./FormPlaceholder";

const VoronoiForm = () => {
  //state for form component
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
  //state for progress bar
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressMax, setProgressMax] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  //state for keeping number of intervals to 1
  const [oldInterval, setOldInterval] = useState({});
  const [newInterval, setNewInterval] = useState({});

  // UI states
  const [openModal, setOpenModal] = useState(false);
  const [showVoronoi, setShowVoronoi] = useState(false);

  const history = useHistory();

  //function to get data from MET API
  const getVoronoi = async (route) => {
    try {
      const artList = (await axios.get(route)).data.objectIDs;
      setProgressMax(artList.length);
      const artData = await Promise.all(
        artList.map(async (artId, i) => {
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
          setCurrentIndex(i); //once we get a new piece of art, we change the currentIndex
          return artObj;
        })
      );
      setShowVoronoi(true);
      return artData;
    } catch (err) {
      setErrorMessage(
        "No results! Please change your search query! (Check out our tips on how to create your own voronoi)"
      );
      console.error(err);
    }
  };
  //when we change the current index (which means we've loaded another piece of art) we increment progress
  useEffect(() => {
    setCurrentProgress(currentProgress + 1);
  }, [currentIndex]);
  //queries the met API when we search, and loads the results to artData
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
        artDataHolder = artDataHolder.filter((val) => {
          return val.artistGender === "Female";
        });
      if (!artDataHolder.length)
        setErrorMessage("No results! Please change your search query!");
      setArtData(artDataHolder);
    };
    if (search.query) {
      setCurrentProgress(0);
      fetchData();
    }
  }, [search]);

  //creates a new voronoi when we get new art data or cell counts
  useEffect(() => {
    try {
      //resets progress bar
      setCurrentProgress(0);
      setProgressMax(0);

      if (artData.length > 1) {
        //only render a canvas if we have artData. Otherwise, we will just have a black box
        const chartRender = chart.render(
          "#user-generated",
          artData,
          numberOfCells
        );
        const interval = setInterval(() => chartRender.next(), 10);
        setNewInterval(interval);
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
  //clears old interval when we get a new one
  useEffect(() => {
    clearInterval(oldInterval);
    setOldInterval(newInterval);
  }, [newInterval]);
  return (
    <div className='w-screen h-screen'>
      <Navbar />
      <div className='lg:hidden text-heading2 flex flex-col justify-center items-center mt-[300px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-16 h-16 mr-2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
          />
        </svg>
        Oops! This feature is only available in the desktop!
        <button
          className='text-paragraph bg-accent-900 rounded-md h-16 px-8 mt-2'
          onClick={() => history.push("/main")}
        >
          Take Me Back to Essay!
        </button>
      </div>
      <div className='min-vh-100 flex-row-reverse hidden lg:flex'>
        <HowToDialog open={openModal} closeModal={() => setOpenModal(false)} />
        <div
          className='mx-auto ms-2 me-2 d-flex justify-content-end flex-column'
          style={{ minWidth: "500px" }} //or 30%
        >
          <h2 className='text-primary-100 text-heading2 text-center mx-auto mt-5'>
            Create Your Own Voronoi
          </h2>
          <form
            id='new-voronoi-form'
            className='mx-auto fs-7 p-4 d-flex flex-column flex-grow-1 justify-content-around'
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
                className='text-center mx-auto form-label'
                htmlFor='highlight'
              >
                Show only highlighted works
              </label>{" "}
              <input
                name='highlight'
                type='checkbox'
                className=''
                value={highlight}
                onChange={() => setHighlight(!highlight)}
                checked={highlight}
              />
            </span>

            <span>
              {" "}
              <label className='form-label mx-auto' htmlFor='femaleArtist'>
                Show only works by female artists
              </label>{" "}
              <input
                name='femaleArtist'
                type='checkbox'
                value={femaleArtist}
                onChange={() => setFemaleArtist(!femaleArtist)}
                checked={femaleArtist}
              />
            </span>

            <div className='d-flex justify-content-between align-items-start'>
              <div
                className=''
                onChange={() => {
                  setArtistOrCulture(!artistOrCulture);
                  setTags(!tags);
                }}
              >
                <p className=''>
                  Search by Artist & Culture or by Tags: <br></br>{" "}
                  <span>
                    <input
                      type='radio'
                      id='artistCulture'
                      name='culture-or-tags'
                      value='artistOrCulture'
                    />{" "}
                    <label htmlFor='artistCulture'>Artist and Culture</label>{" "}
                    <input
                      type='radio'
                      id='tags'
                      name='culture-or-tags'
                      value='tags'
                      className='bs-pink'
                      defaultChecked
                    />{" "}
                    <label htmlFor='tags'>Tags</label>
                  </span>
                </p>
              </div>
              <button
                type='button'
                className='btn btn-outline-info rounded-circle mx-4'
                style={{ width: "50px", height: "50px" }}
                data-bs-toggle='modal'
                data-bs-target='#infoModal'
                onClick={() => setOpenModal(true)}
              >
                ?
              </button>
            </div>

            <span className='d-flex justify-content-end text-primary-900'>
              <label
                className='align-self-center me-3 text-primary-50'
                htmlFor='department'
              >
                Filter to Department
              </label>
              <select
                name='department'
                id='department'
                className='w-50'
                value={`${departmentId}`}
                onChange={(evt) =>
                  setDepartmentId(parseInt(evt.target.value, 10))
                }
              >
                <option value='0'>Any</option>
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
            <div className='d-flex justify-content-end'>
              <label className='me-3 align-self-center' htmlFor='location'>
                Location
              </label>
              <input
                className='w-50 text-primary-900'
                type='text'
                id='location'
                value={location}
                onChange={(evt) => setLocation(evt.target.value)}
                placeholder=' ie: New York'
              />
            </div>
            <div className='d-flex justify-content-end '>
              <label className='align-self-center me-3' htmlFor='query'>
                Search Term
              </label>
              <input
                type='text'
                className='w-50 text-primary-900'
                id='query'
                value={query}
                onChange={(evt) => setQuery(evt.target.value)}
                required
                placeholder=' ie: cat'
              />
            </div>
            <div className='d-flex justify-content-end text-primary-900'>
              <label
                className='align-self-center me-3 text-primary-50'
                htmlFor='cell-count'
              >
                Number of Cells
              </label>
              <input
                className='w-50'
                type='number'
                id='cell-count'
                value={numberOfCells}
                min='3'
                step='1'
                onChange={(evt) => {
                  let cellCount = evt.target.value;
                  if (cellCount < 3) cellCount = 3;
                  setNumberOfCells(cellCount);
                }}
              />
            </div>
            <p className='align-self-end'>
              (too many cells can impact performance)
            </p>
            {progressMax ? (
              <div className='progress' style={{ width: "100%" }}>
                <div
                  className='progress-bar'
                  role='progressbar'
                  aria-valuenow={currentProgress}
                  aria-valuemin='0'
                  aria-valuemax={progressMax}
                  style={{
                    width: `${(currentProgress / progressMax) * 100}%`,
                    backgroundColor: "#a63d40",
                  }}
                ></div>
              </div>
            ) : (
              ""
            )}
            <button
              type='submit'
              id='formBtn'
              className='bg-accent-800 h-10 rounded-md hover:bg-accent-900'
            >
              Create Voronoi!
            </button>
          </form>
        </div>
        {!showVoronoi && <FormPlaceholder />}
        <div id='modal'></div>
        {errorMessage ? (
          <p
            className='flex-grow-1 mx-5 my-auto fs-2 text'
            style={{ color: "#a63d40" }}
          >
            {errorMessage}
          </p>
        ) : (
          <canvas
            id='user-generated'
            className='flex-grow-1 mx-4 me-0 my-auto'
            height='500'
            width='700'
          ></canvas>
        )}
      </div>
    </div>
  );
};

export default VoronoiForm;
