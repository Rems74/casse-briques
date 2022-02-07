class Joueur {
    get score(){
        return this._score;
    }

    set score(value){
        this._score = value;
        this.$score.textContent = this._score;
        console.log(this)
    }

    constructor(name,scoreId){
        this._score = 0;
        this.name = name;
        this.scoreId = scoreId;
        this.$el = document.getElementById(scoreId);



    }
}