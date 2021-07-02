// const d3=require('d3')
const container = {};
container.render = (selector, cellCount) => {
  var svg = d3.select(selector), //selects element tagged svg
    width = +svg.attr("width"), //accessing the width property
    height = +svg.attr("height"), //accessing the height property
    radius = 10;
  //range sets the number of circles
  const circles = d3.range(cellCount).map(function () {
    return {
      x: Math.round(Math.random() * (width - radius * 2) + radius),
      y: Math.round(Math.random() * (height - radius * 2) + radius),
    };
  });
  const defs = svg.append("svg:defs");

  defs
    .append("svg:pattern")
    .attr("id", "test_painting")
    .attr("width", 960) //in pixels
    .attr("height", 500) //in pixels
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr(
      "xlink:href",
      "https://images.metmuseum.org/CRDImages/ad/original/DP-12550-001.jpg"
    )
    .attr("width", 1260)
    .attr("height", 500)
    .attr("x", -50)
    .attr("y", 80);

  const color = d3.scaleOrdinal().range(d3.schemeCategory20);
  const voronoi = d3
    .voronoi()
    .x(function (d) {
      return d.x;
    })
    .y(function (d) {
      return d.y;
    })
    .extent([
      [-1, -1],
      [width + 1, height + 1],
    ]);
  //selects all the children of SVG's containers
  const circle = svg
    .selectAll("g")
    .data(circles)
    .enter()
    .append("g")
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );
  let cell = circle
    .append("path")
    .data(voronoi.polygons(circles))
    .attr("d", renderCell)
    .attr("id", function (d, i) {
      return "cell-" + i;
    })
    .style("fill", "url(#test_painting");
  circle
    .append("clipPath")
    .attr("id", function (d, i) {
      return "clip-" + i;
    })
    .append("use")
    .attr("xlink:href", function (d, i) {
      return "#cell-" + i;
    })
    .style("fill", function (d, i) {
      return color(i);
    });
  circle
    .append("circle")
    .attr("clip-path", function (d, i) {
      return "url(#clip-" + i + ")";
    })
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    })
    .attr("r", radius)
    .style(
      "fill",
      "none"
      // function (d, i) {
      //   return color(i);}
    );
  function dragstarted(d) {
    d3.select(this).raise().classed("active", true);
  }
  function dragged(d) {
    d3.select(this)
      .select("circle")
      .attr("cx", (d.x = d3.event.x))
      .attr("cy", (d.y = d3.event.y));
    cell = cell.data(voronoi.polygons(circles)).attr("d", renderCell);
  }
  function dragended(d, i) {
    d3.select(this).classed("active", false);
  }
  function renderCell(d) {
    return d == null ? null : "M" + d.join("L") + "Z";
  }
};
export default container;
