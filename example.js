'use strict';

const lolItemImage = require('lol-image-parser');
lolItemImage.config.riotApiKey = 'YOUR_RIOT_API_KEY';

lolItemImage
    .getItemImageUrl('boots of speed')
    .then((url) => {
        console.log(url);
    })
    .catch((err) => {
        console.error(err);
    });