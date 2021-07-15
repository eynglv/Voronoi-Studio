const renderModal = (selector, artPiece, context) => {
  d3.select(selector).classed("open", true).classed("close", false);
  //the modal will toggle between open and close class (see closeModal function)
  const data = [artPiece];
  //data is required to be an array to be bound on line 10

  const modal = d3
    .select(selector)
    .selectAll(".modalContent") //this div doesn't exist yet, but we're calling it so we can bind the data to it
    .data(data)
    .join(function (enter) {
      //enter = d3.select(selector)
      enter
        .append("span")
        .attr("class", "closeBtn")
        .text("close")
        .style("background-color", " rgba(125, 133, 112, 0)");
      enter
        .append("div")
        .attr("class", "modalContent")
        // .append("div")
        // .attr("class", "modalImage")
        // .style("background-image", (data) => {
        //   return `url("${data.primaryImageSmall}")`;
        // });
        .append("img")
        .attr("class", "modalImage")
        .attr("src", (data) => {
          return data.primaryImageSmall;
        })
        .attr("height", "70%")
        .attr("width", "80%");

      enter
        .append("h3")
        .attr("class", "text-center")
        .attr("id", "modalTitle")
        .text((data) => {
          return data.title;
        });
      enter
        .append("p")
        .attr("class", "text-center")
        .attr("id", "modalAuthor")
        .text((data) => {
          return `- ${data.artistDisplayName} -`;
        });
      return enter;
    });

  d3.select(".closeBtn").on("click", closeModal);

  function closeModal() {
    d3.select(selector).classed("close", true).classed("open", false);
    context.filter = "blur(0px)";
    //unblurs the canvas
    d3.select(selector).html("");
    //resets the html so we can choose another artwork without appending to previous artwork HTML
  }
};
export default renderModal;
