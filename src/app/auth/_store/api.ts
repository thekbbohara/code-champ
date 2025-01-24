//import axios from "axios";
import request, { METHOD_TYPE } from "@/axios/requests";

//});
export const getUserData = async ({ username }: { username: string }) => {
  const res = await request({
    url: `/users/${username}`,
    method: METHOD_TYPE.GET,
    headers: {
      "Content-type": "application/json",
    },
  });
  return res;
};

//export const getUserData = async ({ username }: { username: string }) => {
//  const res = await axios.get(`/api/users/${username}`, {
//    headers: {
//      "Content-type": "application/json",
//    },
//  });
//  return res;
//};
