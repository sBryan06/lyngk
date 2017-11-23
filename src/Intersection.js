"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (coord) {
    var state = Lyngk.State.VACANT;
    var pieces = [];
    var coordinates;
    coordinates = new Lyngk.Coordinates(coord.getColonne(), coord.getLigne());

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

    this.getCoord = function () {
        return coordinates;
    };

    this.getPieces = function () {
        return pieces;
    };

    this.addPiece = function (piece) {
        pieces.push(piece);
        this.setStateONEPIECE();
        this.setStateSTACK();
        this.setStateFULLSTACK();
    };

    this.setStateONEPIECE = function () {
        if (pieces.length === 1) {
            state = Lyngk.State.ONE_PIECE;
        }
    };
    this.setStateSTACK = function () {
        if (pieces.length > 1 && pieces.length < 5) {
            state = Lyngk.State.STACK;
        }
    };
    this.setStateFULLSTACK = function () {
        if (pieces.length === 5) {
            state = Lyngk.State.FULL_STACK;
        }
    };

    this.removeLastPiece = function () {
        pieces.pop();
        if (pieces.length === 0) {
            state = Lyngk.State.VACANT;
        }
    };
};
