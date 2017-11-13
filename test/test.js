'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testStory1 = function () {
    var coordinates = new Lyngk.Coordinates('A',1);

    assertFalse(coordinates.is_valid());
};

LyngkTestCase.prototype.testStory2 = function () {
    var colones = ['A','B','C','D','E','F','G','H','I'];
    var lignes = [1,2,3,4,5,6,7,8,9];
    var count=0;
    for(var i in colones) {
        for(var j in lignes) {
            var coordinates = new Lyngk.Coordinates(colones[i],lignes[j]);
            if(coordinates.is_valid() == true){
                count++;
            }
        }
    }
    assertEquals(count, 43);
};

LyngkTestCase.prototype.testStory3 = function () {
    var coordinates3 = new Lyngk.Coordinates('A', 3);
    assertEquals(coordinates3.to_string(), 'A3');
};

LyngkTestCase.prototype.testStory4 = function () {
    var coordinates3 = new Lyngk.Coordinates('A', 1);
    assertEquals(coordinates3.to_string(), 'invalid');
};

LyngkTestCase.prototype.testStory5 = function () {
    var coordinates3 = new Lyngk.Coordinates('A', 3);
    var coordinatesCopy = coordinates3.clone();
    assertEquals(coordinates3.to_string(), coordinatesCopy.to_string());
};

LyngkTestCase.prototype.testStory6 = function () {
    var coordinatesA3 = new Lyngk.Coordinates('A', 3);
    var coordinatesB3 = new Lyngk.Coordinates('B', 3);

    assertTrue(coordinatesA3.hash() < coordinatesB3.hash());
};

LyngkTestCase.prototype.testStory7 = function () {
    var intersectionTest = new Lyngk.Intersection(new Lyngk.Coordinates('A', 3));

    assertEquals(intersectionTest.getState(), Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testStory8 = function () {
    var pieceBleu = new Lyngk.Piece(Lyngk.Color.BLUE);

    var intersectionTest = new Lyngk.Intersection(new Lyngk.Coordinates('A', 3));

    intersectionTest.addPiece(pieceBleu);

    assertEquals(intersectionTest.getState(), Lyngk.State.ONE_PIECE);
    assertEquals(intersectionTest.getColor(), Lyngk.Color.BLUE);
};

LyngkTestCase.prototype.testStory9 = function () {
    var pieceBleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var pieceRouge = new Lyngk.Piece(Lyngk.Color.RED);

    var intersectionTest = new Lyngk.Intersection(new Lyngk.Coordinates('A', 3));
    intersectionTest.addPiece(pieceBleu);
    intersectionTest.addPiece(pieceRouge);

    assertEquals(intersectionTest.getState(), Lyngk.State.STACK);
    assertEquals(intersectionTest.getColor(), Lyngk.Color.RED);
};

LyngkTestCase.prototype.testStory10 = function () {
    var pieceBleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var pieceRouge = new Lyngk.Piece(Lyngk.Color.RED);
    var pieceNoire = new Lyngk.Piece(Lyngk.Color.BLACK);
    var pieceIvoire = new Lyngk.Piece(Lyngk.Color.IVORY);
    var pieceVerte = new Lyngk.Piece(Lyngk.Color.GREEN);


    var intersectionTest = new Lyngk.Intersection(new Lyngk.Coordinates('A', 3));
    intersectionTest.addPiece(pieceBleu);
    intersectionTest.addPiece(pieceRouge);
    intersectionTest.addPiece(pieceIvoire);
    intersectionTest.addPiece(pieceNoire);
    intersectionTest.addPiece(pieceVerte);

    assertEquals(intersectionTest.getState(), Lyngk.State.FULL_STACK);
};

LyngkTestCase.prototype.testStory11 = function () {
    var engine = new Lyngk.Engine();

    engine.init();

    assertEquals(engine.getPlateau().length, 43);

    var tab = engine.getPlateau();
    for(var i=0; i<tab.length; i++){
        assertEquals(tab[i].getState(), Lyngk.State.ONE_PIECE);
    }
};

LyngkTestCase.prototype.testStory12 = function () {
    var engine = new Lyngk.Engine();

    engine.init();

    var countBlue = 0;
    var countRed = 0;
    var countBlack = 0;
    var countIvory = 0;
    var countGreen = 0;
    var countWhite = 0;


    var tab = engine.getPlateau();
    for(var i=0; i<tab.length; i++){
        if(tab[i].getColor() === Lyngk.Color.BLUE){
            countBlue++;
        }else if(tab[i].getColor() === Lyngk.Color.RED){
            countRed++;
        }else if(tab[i].getColor() === Lyngk.Color.BLACK){
            countBlack++;
        }else if(tab[i].getColor() === Lyngk.Color.IVORY){
            countIvory++;
        }else if(tab[i].getColor() === Lyngk.Color.GREEN){
            countGreen++;
        }else if(tab[i].getColor() === Lyngk.Color.WHITE){
            countWhite++;
        }
    }
    assertEquals(countBlue, 8);
    assertEquals(countBlack, 8);
    assertEquals(countRed, 8);
    assertEquals(countIvory, 8);
    assertEquals(countRed, 8);
    assertEquals(countWhite, 3);
};

LyngkTestCase.prototype.testStory13 = function () {
    var engine = new Lyngk.Engine();

    engine.init();

    var tab = engine.getPlateau();
    for(var i=0; i<tab.length; i++){
        assertEquals(tab[i].getHauteur(), 1);
    }
};

LyngkTestCase.prototype.testStory14 = function () {
    var engine = new Lyngk.Engine();

    engine.init();

    var tab = engine.getPlateau();
    tab[0].addPiece(new Lyngk.Piece(Lyngk.Color.BLACK));
    tab[0].addPiece(new Lyngk.Piece(Lyngk.Color.RED));
    tab[0].addPiece(new Lyngk.Piece(Lyngk.Color.BLUE));

    assertEquals(tab[0].getHauteur(), 4);
    assertEquals(tab[0].getState(), Lyngk.State.STACK);
    assertEquals(tab[0].getColor(), Lyngk.Color.BLUE);
};

LyngkTestCase.prototype.testStory15 = function () {
    var engine = new Lyngk.Engine();
    engine.init();
    var tab = engine.getPlateau();

    var colorBeforeA3 = engine.getIntersection('A3').getColor();
    console.log(colorBeforeA3);

    engine.movePiece('A3', 'B3');

    assertEquals(engine.getIntersection('A3').getState(), Lyngk.State.VACANT);
    assertEquals(engine.getIntersection('A3').getColor(), null);
    assertEquals(engine.getIntersection('B3').getColor(), colorBeforeA3);
};

LyngkTestCase.prototype.testStory16 = function () {
    var engine = new Lyngk.Engine();
    engine.init();
    var tab = engine.getPlateau();

    var colorAvantMovement = engine.getIntersection('A3').getColor();
    console.log(colorAvantMovement);

    engine.movePiece('A3', 'B3');
    engine.movePiece('B3', 'B2');

    assertEquals(engine.getIntersection('A3').getState(), Lyngk.State.VACANT);
    assertEquals(engine.getIntersection('A3').getColor(), null);
    assertEquals(engine.getIntersection('B3').getState(), Lyngk.State.VACANT);
    assertEquals(engine.getIntersection('A3').getColor(), null);
    assertEquals(engine.getIntersection('A3').getColor(), colorAvantMovement);
    assertEquals(engine.getIntersection('A3').getHauteur(), 3);

};