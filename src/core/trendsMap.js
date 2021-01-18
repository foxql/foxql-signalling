class TrendsMap {

    entrys = {}
    timeOut = (1000 * 60 * 60);

    trendMinLimit = 2;
    maxListCount = 10;


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
        const documentId = doc.documentId;
        if(this.entrys[documentId] === undefined) {
            this.entrys[documentId] = {
                doc : doc,
                count : 1,
                trend : 0
            };

            this.dropCount(documentId);

        }else{
            this.entrys[documentId].count += 1;
            if(this.entrys[documentId].count > this.trendMinLimit){
                this.entrys[documentId].trend += 1;
                this.emit('newDoc', this.entrys[documentId]);
            }
        }
    }


    remove(documentId)
    {
        delete this.entrys[documentId];
    }


    dropCount(documentId)
    {
        setTimeout(()=>{

            let target = this.entrys[documentId] || false;
            if(typeof target !== 'object') return false;

            target.count -= 1;

            if(target.count > 0 ) {

                if(target.count < this.trendMinLimit) {
                    if(target.trend > 0 && target.count > this.trendMinLimit / 2){
                        this.emit('dropDoc', target);
                        this.remove(documentId);
                    }
                    
                }
                this.dropCount(documentId);
            }else{
                if(target.trend > 0){
                    this.emit('dropDoc', target);
                }
                this.remove(documentId);
            }

        }, this.timeOut);
    }


    list()
    {
        return Object.values(this.entrys).slice(0, this.maxListCount);
    }



}



module.exports = TrendsMap;