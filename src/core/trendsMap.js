const crawler = require('../utils/trendsCrawler.js')

class TrendsMap {

    trends = {};
    resource = 'https://trends24.in/'
 
    constructor(locations)
    {
        locations.forEach( location => {
            this.trends[location] = {
                trends : [],
                api : this.resource + location
            };
        });

        this.loadTrends();

        setInterval(()=>{
            this.loadTrends();
            console.log('Trends refresh')
        }, ((1000 * 60) * 60) * 30 )

    }

    async loadTrends()
    {
        for(let key in this.trends) {
            const target = this.trends[key];
            this.trends[key].trends = await crawler.parse(target.api);
        }
    }


    list(country)
    {
        if(typeof country != 'string') {
            return [];
        }
        const trends = this.trends[country] ||false;
        if(!trends) {
            return [];
        }

        return trends.trends || []
    }



}



module.exports = TrendsMap;