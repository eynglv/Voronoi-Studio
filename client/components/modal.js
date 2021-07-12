const renderModal = (selector, artPiece) => {
  const modal = d3.select(selector);
  console.log(artPiece);
  modal.append("span").attr("class", "closeBtn").text("close");
  modal
    .append("div")
    .attr("class", "modalContent")
    .append("img")
    .attr("src", artPiece.primaryImageSmall);
};
export default renderModal;
