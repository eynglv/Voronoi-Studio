import React, { useState } from "react";
import axios from "axios";

// const handleSubmit=(evt)=>{
//     evt.preventDefault();

// }

export default () => {
	const [highlight, setHighlight] = useState(true);
	const [tags, setTags] = useState(true);
	const [departmentId, setDepartmentId] = useState(null);
	const [location, setLocation] = useState(null);
	const [artistOrCulture, setArtistOrCulture] = useState(false);
	const [query, setQuery] = useState("");
	const [search, setSearch] = useState({});
	const [artData, setArtData] = useState([]);

	return (
		<form id="new-voronoi-form">
			<label htmlFor="highlight">Show only highlighted works</label>
			<input
				name="highlight"
				type="checkbox"
				value={highlight}
				onChange={(evt) => setHighlight(!highlight)}
				checked={highlight}
			/>
			<p>Search Artist and Culture, or Tags?</p>
			<div>
				<input
					type="radio"
					id="artistCulture"
					name="culture-or-tags"
					value="artistOrCulture"
					onChange={() => setArtistOrCulture(!artistOrCulture)}
					checked={artistOrCulture}
				/>
				<label htmlFor="artistCulture">Artist and Culture</label>
				<input
					type="radio"
					id="tags"
					name="culture-or-tags"
					value="tags"
					checked={tags}
					onChange={() => setTags(!tags)}
				/>
				<label htmlFor="tags">Tags</label>
			</div>
		</form>
	);
};
