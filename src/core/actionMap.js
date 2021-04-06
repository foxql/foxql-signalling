class actionMap {

    actions = [];
    map = {};

    constructor()
    {

    }

    new(action)
    {
        const actionString = this.stringify(action);
        if(this.map[actionString] != undefined) {
            console.log(actionString)
            return;
        }

        this.map[actionString] = true;

        if(this.actions.length >= 25){
            const targetAction = this.actions.pop();
            delete this.map[this.stringify(targetAction)]
        }
        this.actions.unshift(action);
    }

    list()
    {
        return this.actions;
    }

    stringify(obj)
    {
        return JSON.stringify(obj).replace(/^[a-z0-9]+$/gi, '');
    }

}



module.exports = actionMap;