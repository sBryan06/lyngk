"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var plateau = [];
    var colones = ['A','B','C','D','E','F','G','H','I'];
    var lignes = [1,2,3,4,5,6,7,8,9];
    var player = 1;

    this.getPlateau = function () {
        return plateau;
    };

    this.getIntersection = function (position) {
        for(var p=0; p<plateau.length; p++){
            if(plateau[p].getCoord().to_string() === position){
                return plateau[p];
            }
        }
    };

    this.getPlayer = function () {
        return player;
    };

    // On renvoie un nombre aléatoire entre une valeur min (incluse)
    // et une valeur max (exclue)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    this.createTabPieces = function () {
        var tabPieces = [];
        for(var a=0; a<8; a++){
            tabPieces.push(new Lyngk.Piece(Lyngk.Color.BLUE));
            tabPieces.push(new Lyngk.Piece(Lyngk.Color.RED));
            tabPieces.push(new Lyngk.Piece(Lyngk.Color.BLACK));
            tabPieces.push(new Lyngk.Piece(Lyngk.Color.IVORY));
            tabPieces.push(new Lyngk.Piece(Lyngk.Color.GREEN));
        }
        for(var b=0; b<3; b++){
            tabPieces.push(new Lyngk.Piece(Lyngk.Color.WHITE));
        }
        return tabPieces;
    };

    this.init = function () {
        var tabPieces = this.createTabPieces();
        var indiceAlea = 0;
        var pieceTemp;

        for(var i in colones) {
            for(var j in lignes) {
                var coordinates = new Lyngk.Coordinates(colones[i],lignes[j]);
                if(coordinates.is_valid() == true){
                    // creation de l'intersection
                    var intersection = new Lyngk.Intersection(coordinates);
                    indiceAlea = getRandomInt(0,tabPieces.length);
                    pieceTemp = tabPieces[indiceAlea];
                    tabPieces.splice(indiceAlea, 1);
                    // ajout de la piece a l'intersection
                    intersection.addPiece(pieceTemp);
                    plateau.push(intersection);
                }
            }
        }
    };

    this.movePiece = function (coord1, coord2) {
        if ( !this.checkCoords(coord1, coord2)){
            return;
        }
        if( !this.move_is_valid(coord1, coord2)){
            return;
        }
        if (!this.checkHeightBeforeMove(coord1, coord2)){
            return;
        }
        // if ( !this.checkColors(coord1, coord2)){
        //     console.log('error color');
        //     return;
        // }
        // false les tests précédents

        var piecesColorTemp = [];
        var hauteur = this.getIntersection(coord1).getHauteur();

        for(var i = 0; i < hauteur; i++){
            piecesColorTemp.push(this.getIntersection(coord1).getColor());
            this.getIntersection(coord1).removeLastPiece();
        }

        piecesColorTemp.reverse();

        for(var i =0; i<piecesColorTemp.length; i++){
            this.getIntersection(coord2).addPiece(new Lyngk.Piece(piecesColorTemp[i]));
        }
    };

    this.checkCoords = function (c1, c2) {
        if (!this.coord_of_intersection_is_valid(c1)) {
            return false;
        } else if (!this.coord_of_intersection_is_valid(c2)) {
            return false;
        } else if (this.intersection_is_empty(c2)) {
            return false;
        }
        return true;
    };

    this.checkHeightBeforeMove = function (coord1, coord2){
        var hauteurC1 = this.getIntersection(coord1).getHauteur();
        var hauteurC2 = this.getIntersection(coord2).getHauteur();
        var newHauteur = parseInt(hauteurC1) + parseInt(hauteurC2);

        if (newHauteur > 5){
            // faux si la future intersection a plus de 5 pieces
            return false;
        }
        // if (hauteurC1 === 1 && hauteurC2 > 1){
        //     // faux si une piece seul est déplacé sur une pile
        //     return false;
        // }
        if (hauteurC1 < hauteurC2){
            // faux si pile déplacé sur une plus grande
            return false;
        }
        return true;
    };

    this.checkColors = function (coord1, coord2) {
        var piecesC1 = this.getIntersection(coord1).getPieces();
        var piecesC2 = this.getIntersection(coord2).getPieces();

        for(var i=0; i< piecesC1.length; i++){
            for(var j=0; j< piecesC2.length; j++){
                if (piecesC1[i].getColor() === piecesC2[j].getColor()) {
                    if (piecesC1[i].getColor() !== Lyngk.Color.WHITE){
                        return false;
                    }
                }
            }
        }
        return true;
    };

    this.coord_of_intersection_is_valid = function (coord) {
        return (this.getIntersection(coord).getCoord().is_valid());
    };

    this.intersection_is_empty = function (coord) {
        return (this.getIntersection(coord).getState() === Lyngk.State.VACANT);
    };

    this.move_is_valid = function (coord1, coord2) {
        var c1 = new Lyngk.Coordinates(coord1.charAt(0), coord1.charAt(1));
        var c2 = new Lyngk.Coordinates(coord2.charAt(0), coord2.charAt(1));

        if (this.onSameLigne(c1,c2) || this.onSameColonne(c1,c2) || this.onSameDiagonal(c1,c2)) {
            return true;
        }
        return false;
    };

    this.onSameColonne = function (coord1, coord2) {
        // return (coord1.getColonne() === coord2.getColonne());
        var ok = false;
        var test;
        if (coord1.getColonne() === coord2.getColonne()){
            test = parseInt(coord1.getLigne()) - parseInt(coord2.getLigne());
            if(test == 1 || test == -1){
                ok = true;
            }
        }
        return ok;
    };

    this.onSameLigne = function (coord1, coord2) {
        // return (coord1.getLigne() === coord2.getLigne());
        var ok = false;
        var test;
        if (coord1.getLigne() === coord2.getLigne()){
            test = (coord1.getColonne().charCodeAt(0)) - (coord2.getColonne().charCodeAt(0));
            if (test == 1 || test == -1){
                ok = true;
            }
        }
        return ok;
    };

    this.onSameDiagonal = function (coord1, coord2) {
        var ok = false;
        var test;
        var diffColonne, diffLigne;
        var ligneCoord1 = parseInt(coord1.getLigne());
        var colonneCoord1 = coord1.getColonne().charCodeAt(0);
        var ligneCoord2 = parseInt(coord2.getLigne());
        var colonneCoord2 = coord2.getColonne().charCodeAt(0);

        if (colonneCoord1 > colonneCoord2){
            diffColonne = colonneCoord1 - colonneCoord2;
            diffLigne =  ligneCoord1 - ligneCoord2;
        } else {
            diffColonne = colonneCoord2 - colonneCoord1;
            diffLigne =  ligneCoord2 - ligneCoord1;
        }
        var res = Math.abs(diffColonne - diffLigne);
        //return (res === 0);

        if (res === 0) {
            test = ligneCoord1 - ligneCoord2;
            if (test == 1 || test == -1){
                ok = true;
            }
        }
        return ok;
    };
};
