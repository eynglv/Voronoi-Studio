const renderModal = (selector, artPiece) => {
  d3.select(selector).classed("open", true).classed("close", false);

  const modal = d3
    .select(selector)
    .selectAll(".modalContent")
    .data([artPiece])
    .join(function (enter) {
      enter.append("span").attr("class", "closeBtn").text("close");
      enter
        .append("div")
        .attr("class", "modalContent")
        .append("img")
        .attr("class", "mx-auto")
        .attr("src", (data) => {
          return data.primaryImageSmall;
        });
      enter
        .append("h3")
        .attr("class", "text-center")
        .text((data) => {
          return data.title;
        });
      enter.append("p").text((data) => {
        return `- ${data.artistDisplayName} -`;
      });
      return enter;
    });

  // d3.select(".closeBtn").on("click", closeModal);
  // d3.select("body").on("click", closeModal);

  // function closeModal() {
  //   d3.select(selector).classed("open", false).classed("close", true);
  // }
};
export default renderModal;
