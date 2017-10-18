"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var plateau = [];

    this.getPlateau = function () {
        return plateau;
    }

    this.init = function () {
        var colones = ['A','B','C','D','E','F','G','H','I'];
        var lignes = [1,2,3,4,5,6,7,8,9];

        var tabPieces = [];
        var pieceBleu = new Lyngk.Piece(Lyngk.Color.BLUE);
        var pieceRed = new Lyngk.Piece(Lyngk.Color.RED);
        var pieceBlack = new Lyngk.Piece(Lyngk.Color.BLACK);
        var pieceIvory = new Lyngk.Piece(Lyngk.Color.IVORY);
        var pieceGreen = new Lyngk.Piece(Lyngk.Color.GREEN);
        var pieceWhite = new Lyngk.Piece(Lyngk.Color.WHITE);

        for(var a=0; a<8; a++){
            tabPieces.push(pieceBleu);
            tabPieces.push(pieceRed);
            tabPieces.push(pieceBlack);
            tabPieces.push(pieceIvory);
            tabPieces.push(pieceGreen);
        }
        for(var b=0; b<8; b++){
            tabPieces.push(pieceWhite);
        }
        // piece qui va etre ajouté au intersection
        var a = 0;

        for(var i in colones) {
            for(var j in lignes) {
                var coordinates = new Lyngk.Coordinates(colones[i],lignes[j]);
                if(coordinates.is_valid() == true){
                    // creation de l'intersection
                    var intersection = new Lyngk.Intersection(coordinates);
                    // ajout de la piece a l'intersection
                    intersection.addPiece(tabPieces[a]);
                    plateau.push(intersection);
                    a++;
                }
            }
        }
    }
};
