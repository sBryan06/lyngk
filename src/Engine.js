"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var plateau = [];

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

    // On renvoie un nombre aléatoire entre une valeur min (incluse)
    // et une valeur max (exclue)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
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
        for(var b=0; b<3; b++){
            tabPieces.push(pieceWhite);
        }

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
        if (this.getIntersection(coord1).getCoord().is_valid() && this.getIntersection(coord2).getCoord().is_valid()){
            if(this.getIntersection(coord2).getState() !== Lyngk.State.VACANT){
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
            }
        }
    }
};
