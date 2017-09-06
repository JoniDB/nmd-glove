import React, {Component} from 'react';
import * as d3 from 'd3';

class DonutChart extends Component {

  componentDidUpdate() {
    const radius = 100;
    const { height, totalCount, width, value } = this.props;


    const data =  [
      {name: 'empty', count: totalCount - value, percentage: ( totalCount - value)/totalCount, color: '#ecf0f1'},
      {name: 'heartrate', count: value, percentage: value/totalCount, color: '#1abc9c'},
    ];

    const svg =
      d3.select(this.refs.anchor)
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(60);

    const pie = d3.pie()
      .sort(null)
    	.value(function(d) {
    	   return d.count;
    	});

    const g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g");

      g.append("path")
        	.attr("d", arc)
          .style("fill", function(d,i) {
          	return d.data.color;
          });

      g.append("text")
        .attr("transform", function(d) {
          var _d = arc.centroid(d);
          _d[0] *= 1.5;	//multiply by a constant factor
          _d[1] *= 1.5;	//multiply by a constant factor
          return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(function(d) {
        if(d.data.percentage < 8) {
          return '';
        }
        return d.data.percentage + '%';
      });

  }

  render() {
    const value = this.props.value;
    return <g ref="anchor"/>
  }
}

export default DonutChart;
