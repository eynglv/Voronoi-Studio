import React, { useEffect, useState } from "react";
import axios from "axios";
import chart from "./pulsate";

export default () => {
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
			console.log(artDataHolder);
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
		<div className="d-flex min-vh-100 flex-row-reverse">
			<div
				className="modal"
				id="infoModal"
				tabindex="-1"
				aria-labelledby="infoModalLabel"
				aria-hidden="true"
			>
				{" "}
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title fw-bold" id="infoModalLabel">
								Tips On How To Create Your Voronoi
							</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body fw-bold">
							<ul id="infoBullets">
								<li id="infoBullets">
									Selecting both the "highlighted artworks"
									and "female artists only" options will not
									likely yield many results. A travesty, we
									know!
								</li>
								<br></br>
								<li id="infoBullets">
									You may search items by a tag or by an
									artist or culture.{" "}
									<span
										id="infoBullets"
										className="fst-italic"
									>
										Note that searching by "artist or
										culture" means you may search by AN
										artist or A culture.{" "}
									</span>
								</li>
								<br></br>
								<li id="infoBullets">
									The location search term must be
									capitalized.
								</li>
								<br></br>
								<li id="infoBullets">
									Once your voronoi is created, you can
									directly change its cell count! Try it out!
								</li>
								<br></br>
								<li id="infoBullets">
									Don't forget to click on the voronoi cells
									to view your query results!
								</li>
							</ul>
						</div>
						<div class="modal-footer">
							<button
								class="btn"
								id="sampleTermBtn"
								data-bs-target="#sampleSearchTerms"
								data-bs-toggle="modal"
								data-bs-dismiss="modal"
							>
								Open For Sample Search Terms
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				class="modal"
				id="sampleSearchTerms"
				aria-hidden="true"
				aria-labelledby="infoModalLabel"
				tabindex="-1"
			>
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title fw-bold" id="infoModalLabel">
								Sample Search Terms
							</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<ul class="list-group list-group-flush fw-bold">
								<li class="list-group-item">
									Tag: Women, Highlighted Works Only
								</li>
								<li class="list-group-item">
									Artist & Culture: Gogh
								</li>
								<li class="list-group-item">
									Department: Asian Art, Tag: Cat
								</li>
								<li class="list-group-item">
									Tag: Angel, Highlighted Works Only
								</li>
								<li class="list-group-item">
									Tag: Flower, Female Artists Only
								</li>
							</ul>{" "}
						</div>
						<div class="modal-footer">
							<button
								class="btn"
								id="sampleTermBtn"
								data-bs-target="#infoModal"
								data-bs-toggle="modal"
								data-bs-dismiss="modal"
							>
								Back to Tips
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className="mx-auto ms-2 me-2 d-flex justify-content-end flex-column"
				style={{ minWidth: "500px" }} //or 30%
			>
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
						<label
							className="form-label mx-auto"
							htmlFor="femaleArtist"
						>
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

					<div className="d-flex justify-content-between align-items-start">
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
									<label htmlFor="artistCulture">
										Artist and Culture
									</label>{" "}
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
						<button
							type="button"
							className="btn btn-outline-info rounded-circle mx-4"
							style={{ width: "50px", height: "50px" }}
							data-bs-toggle="modal"
							data-bs-target="#infoModal"
						>
							?{/* <h3> ?</h3> */}
						</button>
					</div>

					<span className="d-flex justify-content-end">
						<label
							className="align-self-center me-3"
							htmlFor="department"
						>
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
									displayName:
										"Arts of Africa, Oceania, and the Americas",
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
								<option
									value={`${val.departmentId}`}
									key={val.departmentId}
								>
									{val.displayName}
								</option>
							))}
						</select>
					</span>
					<div className="d-flex justify-content-end">
						<label
							className="me-3 align-self-center"
							htmlFor="location"
						>
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
						<label
							className="align-self-center me-3"
							htmlFor="query"
						>
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
						<label
							className="align-self-center me-3"
							htmlFor="cell-count"
						>
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
					{progressMax ? (
						<div className="progress" style={{ width: "100%" }}>
							<div
								className="progress-bar"
								role="progressbar"
								aria-valuenow={currentProgress}
								aria-valuemin="0"
								aria-valuemax={progressMax}
								style={{
									width: `${
										(currentProgress / progressMax) * 100
									}%`,
									backgroundColor: "#a63d40",
								}}
							></div>
						</div>
					) : (
						""
					)}
					<button type="submit" id="formBtn">
						Create Voronoi!
					</button>
				</form>
			</div>
			<div id="modal"></div>
			{errorMessage ? (
				<p
					className="flex-grow-1 mx-5 my-auto fs-2 text"
					style={{ color: "#a63d40" }}
				>
					{errorMessage}
				</p>
			) : (
				<canvas
					id="user-generated"
					className="flex-grow-1 mx-4 me-0 my-auto"
					height="500"
					width="700"
				></canvas>
			)}
		</div>
	);
};
