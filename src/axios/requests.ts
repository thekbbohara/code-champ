import { isAxiosError } from "axios";
import axios from ".";

export const METHOD_TYPE = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
} as const;

export type METHOD_TYPE = (typeof METHOD_TYPE)[keyof typeof METHOD_TYPE];

type QueryType = string[] | URLSearchParams;
type HeadersType = Record<string, string>;

const _request = ({
  url,
  method,
  data,
  query,
  headers,
}: {
  url: string;
  method: METHOD_TYPE;
  data?: string;
  query?: QueryType;
  headers?: HeadersType;
}) => {
  let requestUrl = url;
  headers = headers || { "Content-type": "application/json" };
  // Handle query parameters
  if (query) {
    const queryString =
      query instanceof URLSearchParams
        ? query.toString() // Convert URLSearchParams to string
        : query.join("&"); // Join string array with "&"
    requestUrl += `?${queryString}`;
  }

  // Make the request based on the method
  try {
    switch (method) {
      case METHOD_TYPE.GET:
        return axios.get(requestUrl, { headers });
      case METHOD_TYPE.POST:
        return axios.post(requestUrl, data, { headers });
      case METHOD_TYPE.PUT:
        return axios.put(requestUrl, data, { headers });
      case METHOD_TYPE.PATCH:
        return axios.patch(requestUrl, data, { headers });
      case METHOD_TYPE.DELETE:
        return axios.delete(requestUrl, { headers });
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error("Network error occurred. Please check your connection.");
    }
    throw error;
  }
};

export default _request;
