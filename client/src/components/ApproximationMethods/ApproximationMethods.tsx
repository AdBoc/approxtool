import React, { useState } from 'react';
import { gRPCClients } from '../../gRPCClients';
import { CurveFitRequest } from '../../protos/approximation_pb';
import { Graph } from '../Graph';
import { DataViewer } from '../DataViewer';
import { Models } from '../Models';

const approximationsrv = gRPCClients.approximationClient;
const metadata = {'service-header': 'approximation_service'};

export const ApproximationMethods = () => {
  const [calculationData, setCalculationData] = useState<number[]>([]);

  const handleApproximation = () => {
    const request = new CurveFitRequest();

    const xData = [107.608, 108.632, 109.773, 110.929, 112.075, 113.27, 115.094, 116.219, 117.388,
      118.734, 120.445, 121.95, 123.366, 125.368, 127.852, 130.081];
    const yData = [60.323, 61.122, 60.171, 61.187, 63.221, 63.639, 64.989, 63.761, 66.019, 67.857,
      68.169, 66.513, 68.655, 69.564, 69.331, 70.551];
    const expressions = ['a * x + b', 'a * x + b * x ** 2 + c', 'a * sin ( b * x ) + c', 'a * exp ( - b * x ) + c',
      'd + ( a - d / 1 + ( x / c ) ** b )'];

    request.setXDataList(xData);
    request.setYDataList(yData);
    request.setExpressionsList(expressions);

    approximationsrv.fitCurves(request, metadata, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log(res.toObject().fitResultList);
    });
  };

  // Insert data -> Modal shows up with excel style x,y form. It has 4 cols and ... rows.
  // User can select rows (click), column and press del
  // User can use tab to go to next cell
  // User can paste data or open csv file

  return (
    <div>
      <button type="button">Enter/Show data</button>
      <Models/>
      <Graph/>
      <DataViewer isShowing={true} calculationData={calculationData} setCalculationData={setCalculationData}/>
      <button type="button" onClick={handleApproximation}>Get Approximation</button>
    </div>
  );
};