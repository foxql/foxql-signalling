class TrendsMap {

    entrys = {}
    timeOut = 1000 * 10;

    trendMinLimit = 2;


    _events = {};

    constructor()
    {

    }


    on(name, listener)
    {
        if(this._events[name] == undefined) {
            this._events[name] = listener;
        }
    }


    emit(name, data)
    {
        const method = this._events[name] || false;
        if(typeof method != 'function') {return}
        method(data)
        
    }


    push (doc)
    {   
        const title = doc.title;
        if(this.entrys[title] === undefined) {
            this.entrys[title] = {
                doc : doc,
                count : 1,
                trend : 0
            };

            this.dropCount(title);

        }else{
            this.entrys[title].count += 1;
            if(this.entrys[title].count > this.trendMinLimit){
                this.entrys[title].trend += 1;
                this.emit('newDoc', this.entrys[title]);
            }
        }
    }


    remove(title)
    {
        delete this.entrys[title];
    }


    dropCount(title)
    {
        setTimeout(()=>{

            let target = this.entrys[title] || false;
            if(typeof target !== 'object') return false;

            target.count -= 1;

            if(target.count > 0 ) {

                if(target.count < this.trendMinLimit) {
                    if(target.trend > 0 && target.count > this.trendMinLimit / 2){
                        this.emit('dropDoc', target);
                        this.remove(title);
                    }
                    
                }
                this.dropCount(title);
            }else{
                if(target.trend > 0){
                    this.emit('dropDoc', target);
                }
                this.remove(title);
            }

        }, this.timeOut);
    }






}



module.exports = TrendsMap;