import React from 'react';
import { gRPCClients } from '../gRPCClients';
import { UserData } from '../protos/user_pb';

const clients = gRPCClients;
const messagerClient = clients.userServiceClient;

export const ServiceClient = () => {

  const handleSendRequest = () => {
    const request = new UserData();
    request.setUserid(20);
    messagerClient.getUserId(request, null, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log(res.toObject().userid);
    });
  };

  return (
    <div>
      <p>Proto response</p>
      <button onClick={handleSendRequest}>Send request</button>
    </div>
  );
};