import React, {Component} from 'react';
import * as d3 from 'd3';

class BarChart extends Component {

  componentDidUpdate() {
    const radius = 100;
    const { height, totalCount, width, values } = this.props;

    const data =  [
      {dimension: 'x', value: '0.58'},
      {dimension: 'y', value: '0.2'},
      {dimension: 'z', value: '-0.58'}
    ];

    var x = d3.scaleBand()
        .rangeRound([0, width], .1)
		    .paddingInner(0.1);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x);

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

    x.domain(data.map(function(d) { return d.dimension; }));
    y.domain([-1, 1]);

    const svg =
      d3.select(this.refs.anchor)
	    //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height/2 + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");
/*
      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.dimension); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); });
*/

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
          .attr("x", function(d) { return x(d.dimension); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(Math.max(0, d.value));})
          .attr("height", function(d) { return Math.abs(y(d.value) - y(0)); });

  }

  render() {
    return <g ref="anchor"/>
  }
}

export default BarChart;
