export interface ApiStruct {
  url: string;
  method: string;
  data?: any;
}

export function ApiHelper(data: ApiStruct) {
  return fetch(data.url, {
    method: data.method,
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: data.data,
  })
    .then((res) => {
      if (!res.ok) throw res;
      if (res.status === 401) {
        return {
          status: 401,
          title: "Unauthorized",
        };
      }
      return res.json();
    })
    .then(
      (result) => {
        return result;
      },
      (error) => {
        error = error;
      }
    );
}
