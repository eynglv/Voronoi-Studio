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
  const defs = svg.append("svg:defs");

  defs
    .append("svg:pattern")
    .attr("id", "test_painting")
	.attr("preserveAspectRatio", "xMidYMid slice")
    .attr("width", '100%') //in pixels//could this be changed to the width of the cell.
    .attr("height", '100%') //in pixels
    .attr("patternUnits", "objectBoundingBox")
	// .style("fill-rule","evenodd")
    .append("svg:image")
	.attr(
      "href",
      "https://images.metmuseum.org/CRDImages/ep/original/DT1928.jpg"
    ).attr("preserveAspectRatio", "xMinYMid slice").attr("width", '100%').attr("height", '100%')

  const color = d3.scaleOrdinal().range(d3.schemeCategory20);
  function repeat(d) {
    console.log(this)
    d3.select(this).raise().classed("active", true)
    d3.select(this).transition().duration(2000).delay(10000).attr("x", (d.x = d.x + 200)).attr("y", (d.y = d.y + 100))
    d3.select(this).selectAll("path")
      .transition()
      .delay(10000)
      .duration(5000)
      .attr("x", (d.x = d.x +100))
      .attr("y", (d.y = d.y +100))
   }

  //selects all the children of SVG
  const circle = svg
    .selectAll("g")
    .data(circles)
    .enter()
    .append("g")
    .each(repeat)
    
  circle.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    )

	let cell = circle
    .append("path")
    .data(voronoi.polygons(circles))
    .attr("d", renderCell)
    .attr("id", function (d, i) {
      return "cell-" + i;
    }).style("fill", "url(#test_painting)")

    circle.append("clipPath")
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
    .style("fill", function (d, i) {
      return color(i);
    })




  function dragstarted(d) {
    d3.select(this).raise().classed("active", true);
  }


  function dragged(d) {
    console.log(this)
    d3.select(this)
      .selectAll("path")
      .attr("cx", (d.x = d3.event.x +100))
      .attr("cy", (d.y = d3.event.y +10));
    cell = cell.data(voronoi.polygons(circles)).attr("d", renderCell);
  }

  function dragended(d, i) {
    d3.select(this).classed("active", false);
  }

  function renderCell(d) {
   const dPath = d == null ? null : "M" + d.join("L") + "Z";
	return dPath
  }
}

export default container;
