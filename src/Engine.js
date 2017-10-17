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

        for(var i in colones) {
            for(var j in lignes) {
                var coordinates = new Lyngk.Coordinates(colones[i],lignes[j]);
                if(coordinates.is_valid() == true){
                    var intersection = new Lyngk.Intersection(coordinates);
                    intersection.addPiece(new Lyngk.Piece(Lyngk.Color.BLUE));
                    plateau.push(intersection);
                }
            }
        }
    }
};
