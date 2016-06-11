function Card (opts) {
    this.value = opts.value;
    this.color = opts.color;

    if(this.value === 'STOP'){
        this.shortString = '✘';
    }else if(this.value === 'REVERSE'){
        this.shortString = '↺';
    }else if(this.value === 'COLOR'){
        this.shortString = '❂';
    }else{
        this.shortString = this.value;
    }
    this.addsCards = opts.addsCards;
}
Card.prototype.toString = function() {
    return this.value+'-'+this.color;
};

Card.prototype.toHtml = function(className) {
    className = className || '';
    return '<div class="card '+this.color+' val-'+this.value+' '+className+'"><div class="inner">'+this.shortString+'</div></div>';
};

module.exports = Card;
