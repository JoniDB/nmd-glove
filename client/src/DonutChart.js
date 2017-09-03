import React, {Component} from 'react';
import * as d3 from 'd3';

class DonutChart extends Component {
  render() {
    const value = this.props.value;
    return <h3>{value}</h3>;
  }
}

export default DonutChart;
