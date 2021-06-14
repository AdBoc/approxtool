import React from 'react';
import { gRPCClients } from '../gRPCClients';
import { UserData } from '../protos/userService/protos/user_pb';

const clients = gRPCClients;
const messagerClient = clients.userServiceClient;

export const ServiceClient = () => {

  const handleSendRequest = () => {
    const request = new UserData();
    request.setUserid(20);
    const response = messagerClient.getUserId(request, null, (_, res) => console.log(res));
  };

  return (
    <div>
      <p>Proto response</p>
      <button onClick={handleSendRequest}>Send request</button>
    </div>
  );
};