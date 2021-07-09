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
	const [artistOrCultre, setArtistOrCulture] = useState(false);
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
		</form>
	);
};
