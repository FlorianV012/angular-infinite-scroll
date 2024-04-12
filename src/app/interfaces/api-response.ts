export interface IResponse {
  results: IResponsePhoto[];
  total_pages: number;
}

export interface IResponsePhoto {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}
