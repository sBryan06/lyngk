"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var state = Lyngk.State.VACANT;
    var colorInter = '';
    var pieces= [];

    this.getState = function () {
        return state;
    }

    this.getColor = function () {
        return colorInter;
    }

    this.addPiece = function (piece) {
        if(state === Lyngk.State.VACANT){
            colorInter = piece.getColor();
            pieces.push(piece);
            state = Lyngk.State.ONE_PIECE;
        } else if (pieces.length < 5) {
            colorInter = piece.getColor();
            pieces.push(piece);
            state = Lyngk.State.STACK;
        }
        if (pieces.length === 5){
            state = Lyngk.State.FULL_STACK;
        }
    }
};
