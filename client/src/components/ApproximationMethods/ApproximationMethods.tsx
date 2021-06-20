import React from 'react';
import { gRPCClients } from '../../gRPCClients';
import { CalculationRequest } from '../../protos/approximation_pb';

const approximationsrv = gRPCClients.approximationClient;
const metadata = {"service-header": "approximation_service"};

export const ApproximationMethods = () => {
  const handleApproximation = () => {
    const request = new CalculationRequest();
    request.setModel("model");
    request.setType("least-squares");
    approximationsrv.getApproximation(request, metadata, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log(res.toObject().result);
    });
  };

  return (
    <div>
      <button onClick={handleApproximation}>Get Approximation</button>
    </div>
  );
};