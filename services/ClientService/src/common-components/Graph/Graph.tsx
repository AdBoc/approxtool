import React, {
  useEffect,
  useRef
} from 'react';
import * as d3 from 'd3';
import { GraphExpression } from '../../types/stateExpression';
import { Point } from '../../types';
import styles from './styles.module.scss';
import './graph.css';

export interface Props {
  xScaleDomain: [number, number];
  yScaleDomain: [number, number];
  className?: string;
  graphExpression?: GraphExpression | null;
  points?: Point[];
  responsive?: boolean;
}

export const Graph: React.FC<Props> = React.memo((
  {
    points = [],
    graphExpression = {id: 1, name: '', points: []},
    className,
    xScaleDomain,
    yScaleDomain,
    responsive = false,
  }
): JSX.Element => {
  const chartRef = useRef<SVGSVGElement>(null);
  const expression = graphExpression || {id: 1, name: '', points: []};
  const height = responsive ? 500 : 100;


  useEffect(() => {
    const margin = {top: 20, right: 30, bottom: 30, left: 50};
    const width = responsive ? parseInt(d3.select('#func-chart').style('width')) - margin.left - margin.right : 200;

    let svg: any;
    if (responsive) {
      svg = d3.select(chartRef.current)
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    } else {
      svg = d3.select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    }

    const xScale = d3.scaleLinear()
      .domain(xScaleDomain)
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(yScaleDomain)
      .range([height, 0]);

    let line = d3.line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));

    const lineGroup = svg.append('g');

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden')
      .text('');

    const chartPoints = lineGroup.append('g')
      .selectAll('point')
      .data(points)
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('cx', ([num]: [number, number]) => xScale(num))
      .attr('cy', ([_, num]: [number, number]) => yScale(num))
      .on('mouseover', () => tooltip.style('visibility', 'visible'))
      .on('mousemove', (e: any, d: [number, number]) => {
        tooltip.style('top', (e.pageY - 10) + 'px').style('left', (e.pageX + 15) + 'px');
        tooltip.text(`x: ${d[0]}, y: ${d[1]}`);
      })
      .on('mouseout', () => tooltip.style('visibility', 'hidden'));

    const funcLine = lineGroup.append('path')
      .datum(expression.points)
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 2)
      .attr('d', line);

    const yAxis = d3.axisLeft(yScale).tickSize(-width);
    const yAxisGroup = svg.append('g').call(yAxis);

    const xAxis = d3.axisBottom(xScale).tickSize(-height);/*.tickFormat("");remove tick label*/
    const xAxisGroup = svg.append('g').call(xAxis).attr('transform', 'translate(0,' + height + ')');

    svg.append('text').text('Y Label')
      .attr('x', 0 - height / 2)
      .attr('y', 0 - margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)');
    svg.append('text').text('X Label')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .style('text-anchor', 'middle');

    const zoom = d3.zoom()
      .scaleExtent([0.2, 30])
      .on('zoom', zoomed);

    function zoomed({transform}: any) {
      const new_x = transform.rescaleX(xScale);
      const new_y = transform.rescaleY(yScale);
      xAxisGroup.call(xAxis.scale(new_x));
      yAxisGroup.call(yAxis.scale(new_y));

      chartPoints.data(points)
        .attr('cx', ([num]: [number, number]) => new_x(num))
        .attr('cy', ([_, num]: [number, number]) => new_y(num));

      funcLine.attr('transform', transform);
    }

    const zoomer = d3.select('svg').call(zoom as any);

    d3.select('#reset').on('click', () => zoomer.call(zoom.transform as any, d3.zoomIdentity));

    d3.select('svg').append('defs').append('clipPath').attr('id', 'clip')
      .append('rect').attr('width', width).attr('height', height);
    lineGroup.attr('clip-path', 'url(#clip)');

    return () => {
      svg.remove();
      tooltip.remove();
    };
  }, [expression.points, points, xScaleDomain, yScaleDomain, height, responsive]);

  return (
    <div id="func-chart" className={`${styles.funcChart} ${className && className} ${!responsive && styles.funcFixedSize}`}>
      <svg ref={chartRef}/>
      <button id="reset" className={styles.resetButton}>Reset pos</button>
    </div>
  );
}, () => false);
