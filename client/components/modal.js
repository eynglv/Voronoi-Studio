const renderModal = (selector, artPiece, context) => {
  d3.select(selector).classed("open", true).classed("close", false);
  const data = [artPiece];

  const modal = d3
    .select(selector)
    .selectAll(".modalContent")
    .data(data)
    .join(function (enter) {
      enter.append("span").attr("class", "closeBtn").text("close");
      enter
        .append("div")
        .attr("class", "modalContent")
        .append("img")
        .attr("class", "mx-auto")
        .attr("id", "clickedImage")
        .attr("src", (data) => {
          return data.primaryImageSmall;
        });
      enter
        .append("h3")
        .attr("class", "text-center")
        .text((data) => {
          return data.title;
        });
      enter
        .append("p")
        .attr("class", "text-center")
        .text((data) => {
          return `- ${data.artistDisplayName} -`;
        });
      return enter;
    });

  d3.select(".closeBtn").on("click", closeModal);

  function closeModal() {
    d3.select(selector).classed("close", true).classed("open", false);
    context.filter = "blur(0px)";
    d3.select(selector).html("");
  }
};
export default renderModal;
