# firefox-add-on-scraper

[![https://nodei.co/npm/firefox-add-on-scraper.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/firefox-add-on-scraper.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/firefox-add-on-scraper)

This package is simple typescript package that makes it simple to search for, and download plugins from Firefox.

To begin using this in your project you can run `npm i --save firefox-add-on-scraper`

The package leverages the Mozilla Addons API to fetch data.

## How to use

There are currently 3 methods available for you:

1. search
2. get
3. download

## search

Searching can be done without providing any params. You will just get whatever mozilla decides to give you. Alternatively you could provide, any combination of the following params:

1. query
2. pageNumber
3. pageSize

When passed a `query` string, mozilla will attempt to provide results that are most relevant to that string

When there are multiple pages of results `pageNumber` will let you start at a particular page

To restrict the number of results per page, you can use `pageSize`

The following example will search for 'youtube downloader' addons, restricting the number of results to 3, and fetchthe first page:
```ts
import { firefoxAddOnClient } from 'firefox-add-on-scraper'
const results = await firefoxAddOnClient.addOns.search({
  query: 'youtube downloader',
  pageNumber: 1,
  pageSize: 3,
})
```
It is equivalent to using curl in the following way:
```sh
curl "https://addons.mozilla.org/api/v5/addons/search/?page_size=3&page=1&q=youtube%5Cdownloader"
```

## get

if you know the `slug` for the plugin you want to get, then you can fetch it directly using this method. it takes a single param, which is the `string`

The following example will fetch information for a plugin with the slug of `easy-youtube-video-download`
```ts
import { firefoxAddOnClient } from 'firefox-add-on-scraper'
const result = await firefoxAddOnClient.addOns.get('easy-youtube-video-download');
```

It is equivalent to using curl in the following way:
```sh
curl https://addons.mozilla.org/api/v5/addons/addon/easy-youtube-video-download/
```


## download

For anyone wanting to programatically download a plugin, this CLI provides the `download` method. You provide the url of the plugin you wish to download, and it will do that for you.

This method takes 2 params, the `url` of the plugin, and the `outputPath` for where it should store the file.

You _could_ totally ignore this if you have the url for the file and fetch it however you please. This might give you more freedom on how you wish to store/use the data that was fetched.

To obtain the URL you may wish to use the search/get methdods of this client and inspect the response.

The following example will download one of the addons that was fetched in a previous example


```ts
import { firefoxAddOnClient } from 'firefox-add-on-scraper'
const result = await firefoxAddOnClient.addOns.get('easy-youtube-video-download');

const url = result.current_version.file.url;
const outputPath = './some/path/to/somewhere.xpi'

await firefoxAddOnClient.download({ outputPath, url })
```
the above example would be similar to using `wget`:
```sh
wget https://addons.mozilla.org/firefox/downloads/file/3851158/easy_youtube_video_downloader_express-17.4-an+fx.xpi
```