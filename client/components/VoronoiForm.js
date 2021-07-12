import React, { useEffect, useState } from "react";
import axios from "axios";
const MAX = 10;
import chart from "./pulsate";
// const handleSubmit=(evt)=>{
//     evt.preventDefault();

// }

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
			console.log("getting voronoi");
			const artList = (await axios.get(route)).data.objectIDs;
			console.log("art list", artList);
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
			console.error(err);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const route = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings${
				highlight ? "&isHighlight=true" : ""
			}${tags ? "&tags=true" : ""}${
				artistOrCulture ? "&artistOrCulture=true" : ""
			}${departmentId ? `&departmentId=${departmentId}` : ""}${
				location ? `geoLocation=${location.replaceAll(" ", "|")}` : ""
			}q=${query.replaceAll(" ", "%20")}`;

			let artDataHolder = await getVoronoi(route);
			if (femaleArtist)
				artDataHolder = artDataHolder.filter(
					(val) => val.artistGender === "female"
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
			console.log("hello!!!!!");
			if (artData.length) {
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
			}
		} catch (err) {
			console.error(err);
			setErrorMessage("No results! Please change your search query!");
		}
	}, [artData, numberOfCells]);

	return (
		<div>
			<form
				id="new-voronoi-form"
				onSubmit={(evt) => {
					evt.preventDefault();
					console.log(
						"highlight:",
						highlight,
						"tags",
						tags,
						"departmentId",
						departmentId,
						"location:",
						location,
						"artistOrCulture:",
						artistOrCulture,
						"query:",
						query,
						"femaleArtists",
						femaleArtist
					);
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
				<label htmlFor="highlight">Show only highlighted works</label>
				<input
					name="highlight"
					type="checkbox"
					value={highlight}
					onChange={() => setHighlight(!highlight)}
					checked={highlight}
				/>
				<label htmlFor="femaleArtist">
					Show only works by female artists
				</label>
				<input
					name="femaleArtist"
					type="checkbox"
					value={femaleArtist}
					onChange={() => setFemaleArtist(!femaleArtist)}
					checked={femaleArtist}
				/>
				<p>Search Artist and Culture, or Tags?</p>
				<div
					onChange={() => {
						setArtistOrCulture(!artistOrCulture);
						setTags(!tags);
					}}
				>
					<input
						type="radio"
						id="artistCulture"
						name="culture-or-tags"
						value="artistOrCulture"

						// checked={artistOrCulture}
					/>
					<label htmlFor="artistCulture">Artist and Culture</label>
					<input
						type="radio"
						id="tags"
						name="culture-or-tags"
						value="tags"
						// checked={tags}
						defaultChecked
					/>
					<label htmlFor="tags">Tags</label>
				</div>
				<label htmlFor="department">Filter to Department</label>
				<select
					name="department"
					id="department"
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
							departmentId: 4,
							displayName: "Arms and Armor",
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
							departmentId: 8,
							displayName: "The Costume Institute",
						},
						{
							departmentId: 9,
							displayName: "Drawings and Prints",
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
							departmentId: 12,
							displayName:
								"European Sculpture and Decorative Arts",
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
							departmentId: 18,
							displayName: "Musical Instruments",
						},
						{
							departmentId: 19,
							displayName: "Photographs",
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
				<label htmlFor="location">Location</label>
				<input
					type="text"
					id="location"
					value={location}
					onChange={(evt) => setLocation(evt.target.value)}
					placeholder="any"
				/>
				<label htmlFor="query">Search Term</label>
				<input
					type="text"
					id="query"
					value={query}
					onChange={(evt) => setQuery(evt.target.value)}
					required
				/>
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
			<canvas id="user-generated" height="720" width="1080">
				This is your voronoi!
			</canvas>
		</div>
	);
};
