export interface ApiStruct {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  filter?: Object;
}
interface ReponseApi {
  body?: any;
  error?: any;
  ok?: boolean;
  total?: number;
}
const commonApi = async (contruct: ApiStruct) => {
  const objResponse: ReponseApi = {};

  const response = await fetch(contruct.url, {
    method: contruct.method,
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: contruct.body,
  });

  switch (response.status) {
    case 401:
      objResponse.error = {
        status: 401,
        message: "Unauthorized",
      };
      return objResponse;
    case 204:
      objResponse.ok = true;
      return objResponse;
    default:
      break;
  }

  switch (response.ok) {
    case true:
      const data = await response.json();
      objResponse.ok = true;
      objResponse.body = data;
      if (contruct.method === "GET") {
        objResponse.total = parseInt(
          response.headers?.get("x-total-count") as string
        );
      }
      return objResponse;
    case false:
      const error = await response.json();
      objResponse.ok = false;
      objResponse.error = {
        status: error.status,
        message: error.message,
      };
      return objResponse;
    default:
      objResponse.ok = false;
      return objResponse;
  }
};
export default commonApi;
