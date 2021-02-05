const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function get(path){

    const request = await fetch(path);
    return await request.text();
}

exports.parse = async (path)=>{
    const body = await get(path);

    const $ = cheerio.load(body)

    const parent = $('#trend-list .trend-card').first().find('ol li');
   
    let results = [];

    parent.each(function (i){
        const li = $(this).find('a').remove();
        results.push(li.text().trim().replace(/#/gi,''));
    });
    

    return results;
}