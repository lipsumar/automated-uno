/* global d3 */

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = (window.innerWidth) - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;



var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height,0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");



var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




module.exports = {
    draw: function(data, prop){
        svg.selectAll("*").remove();
        var xMax = data.length > 100 ? data.length : 100;

        x.domain([0, xMax]);
    //y.domain([0, 10 ]);
    //y.domain(d3.extent(data, function(d) { return d.value; }));
        y.domain([0, 50]);

        var lines;
        if(data[0]){
            lines = data[0].scores.map(function(d, i){
                return d3.svg.line()
                    .x(function(d,i) { return x(i); })
                    .y(function(d) { return y(d.scores[i][prop]); });
            });
        }




        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Score");


        svg.append('line')
          .attr('x1', x(0))
          .attr('x2', x(xMax))
          .attr('y1', y(500))
          .attr('y2', y(500));

        if(!data[0]){
            return;
        }
        data[0].scores.map(function(d, i){
            svg.append("path")
              .datum(data)
              .attr("class", "line line-player-"+d.id)
              .attr("d", lines[i]);
        });




        // // Add the scatterplot
        // svg.selectAll("dot")
        //   .data(data)
        //   .enter().append("circle")
        //   .attr("r", 5)
        //   .attr("cx", function(d, i) { return x(i); })
        //   .attr("cy", function(d) { return y(d.value); });
    }
};







