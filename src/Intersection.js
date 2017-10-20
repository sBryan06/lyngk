"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function(coord) {
    var state = Lyngk.State.VACANT;
    var pieces= [];
    var coordinates = new Lyngk.Coordinates(coord.getColonne(), coord.getLigne());

    this.getState = function () {
        return state;
    };

    this.getColor = function () {
        if (pieces.length !== 0) {
            return pieces[pieces.length - 1].getColor();
        }
    };

    this.getHauteur = function () {
        return pieces.length;
    };

    this.getCoord = function(){
        return coordinates;
    };

    this.addPiece = function (piece) {
        if(state === Lyngk.State.VACANT){
            pieces.push(piece);
            state = Lyngk.State.ONE_PIECE;
        } else if (pieces.length < 5) {
            pieces.push(piece);
            state = Lyngk.State.STACK;
        }
        if (pieces.length === 5){
            state = Lyngk.State.FULL_STACK;
        }
    }
};
