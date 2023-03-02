interface ParamsUrl {
  url: string;
  param: Object;
}
export const parseParamUrl = (params: ParamsUrl) => {
  let url = new URL(params.url);
  if (params.param && Object.keys(params.param).length > 0) {
    Object.entries(params.param)
      .filter((item) => item[1] !== undefined)
      .map((key) => {
        url.searchParams.append(key[0], key[1]);
      });
  }
  return url.href;
};
