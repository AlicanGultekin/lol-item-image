# League of Legends Item Image URL Parser

:trophy:

[Riot Games API.STATIC-DATA-V3](https://developer.riotgames.com/api-methods/#static-data-v3/GET_getItemList)

## Installation
`npm install --save lol-item-image`

## Modes
1. Command Line `node . -i "Boots of Speed"`
2. Server `node . -s`
3. Module

:rotating_light: For command line and server modes, set up config.js first.

### Command Line
This is for querying single items, use if necessary but every request will count towards your rate limit as there's no permanent storage.
Feel free to implement your own storage solution if you'd like to use this feature frequently.

### Server
This exposes an endpoint:
**<serverRoot:port>/item/:itemName** `returns the image URL for the given item`

*example:* `http://localhost:1337/item/boots of speed`

First request will fetch items' data from the Riot Games API and cache it and subsequent requests will be served from there.

### Module
You can use the functionality as part of your own programs.
Bluebird promises are in use here, [click here for details](http://bluebirdjs.com/docs/getting-started.html).

```javascript
const lolItemImage= require('lol-item-image');
lolItemImage.config.riotApiKey = 'YOUR_RIOT_API_KEY';

lolItemImage
    .getItemImageUrl('boots of speed')
    .then((url) => {
        console.log(url);
    })
    .catch((err) => {
        console.error(err);
    });
```
or
```javascript
const lolItemImage= require('lol-item-image');

lolItemImage
    .getItemImageUrl('boots of speed', 'YOUR_RIOT_API_KEY')
    .then((url) => {
        console.log(url);
    })
    .catch((err) => {
        console.error(err);
    });
```

### Config
```javascript
{
    riotApiKey: 'YOUR_RIOT_API_KEY',
    cacheCollectionName: 'items', //optional, defaults to this
    dataDragonUrl: 'http://ddragon.leagueoflegends.com/cdn/7.9.2/img/item', //optional, defaults to this URL
    port: 1337, //optional, defaults to this
    proxy: 'http://ip:port', //optional
    alternateItemsUrl: 'http://example.com/items' //optional
}
```

#### ToDo
* Global mode
    * `npm install -g lol-image-parser`
    * `lol-image-parser -i "Boots of Speed"`
* More ToDo items :joy:

##### Feel free to use, contribute, and give feedback :)