const fs = require("fs");
const axios = require("axios");
const apiToSeedFile = async (route, filename) => {
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
	console.log("artData:", artData);
	const artDataString = JSON.stringify(artData);
	console.log("artDataString", artDataString);
	fs.writeFile(filename, artDataString, "utf-8", (err) => {
		console.error(err);
	});
};

const idsToSeedFile = async (fileArray, filename) => {
	const artList = fileArray;

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
	console.log("artData:", artData);
	const artDataString = JSON.stringify(artData);
	console.log("artDataString", artDataString);
	fs.writeFile(filename, artDataString, "utf-8", (err) => {
		console.error(err);
	});
};

idsToSeedFile([436446, 438018, 436501, 435594, 437786, 437069, 485728, 37990, 64839, 436004, 483458, 483437, 436022, 435867, 459110, 436173, 438821], 'femaleNudesByMen.js')

module.exports = apiToSeedFile;
