import { createWriteStream } from 'fs';
import * as stream from 'stream';
import { promisify } from 'util';

import axios, { AxiosResponse } from 'axios';

import { SEARCH_URL, PAGE_NUMBER, PAGE_SIZE, QUERY, ADD_ON_URL } from './consts/';
import { SearchResult, SearchResults } from './types';

const streamFinished = promisify(stream.finished);

type FirefoxAddOnsSearch = {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
};

export const firefoxAddOnsSearch = async (params: FirefoxAddOnsSearch = {}): Promise<SearchResults> => {
  const {
    query,
    pageNumber,
    pageSize,
  } = params;

  const searchParams = new URLSearchParams();
  
  if(query) {
    searchParams.append(QUERY, query);
  }
  
  if(pageNumber) {
    searchParams.append(PAGE_NUMBER, pageNumber.toString());
  }
  
  if(pageSize) {
    searchParams.append(PAGE_SIZE, pageSize.toString());
  }

  return (await axios.get(SEARCH_URL, {
    params: searchParams,
  })).data as SearchResults;
};

export const firefoxAddOnGet = async (addOnSlug: SearchResult['slug']): Promise<SearchResult> => {
  const url = `${ADD_ON_URL}/${addOnSlug}/`;
  return (await axios.get(url)).data as SearchResult;
};

export type FirefoxAddOnDownload = {
  url: SearchResult['current_version']['file']['url'];
  outputPath: string;
}

export const firefoxAddOnDownload = async ({ url, outputPath}: FirefoxAddOnDownload) => {
  const writer = createWriteStream(outputPath);
  return axios
    .get(url, { responseType: 'stream' })
    .then(async (response: AxiosResponse<any>) => {
      response.data.pipe(writer);
      return streamFinished(writer);
    })
};

export const firefoxAddOns = {
  search: firefoxAddOnsSearch,
  get: firefoxAddOnGet,
  download: firefoxAddOnDownload,
}

export const firefoxAddOnClient = ({
  addOns: firefoxAddOns,
});
