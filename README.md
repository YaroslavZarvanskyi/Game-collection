Game collection

Implement classes on diagrams in JavaScript using ES6 syntax. 
BaseName should have such fields: 
•        Title – contains the name of game;
•        minMaxPlayers – contains the minimal and maximal count of players;
•        age – contains the minimal age of players;
•        rating[] – this array contains all marks, set to the game by users;
•        genre[] – this array should contain the list of categories which the game belongs to.
Also this class should constructor that accepts one parameter of String type(it sets title).
BaseGame should have next methods:
•        getFullInfo() – shows the whole information about object;
•        setMyRaiting(Number) – lets to set your mark for the game;
•        fillDate() – lets to input the whole information about the game;
•        addGenre(String) – lets to attach the new category to the list of categories;
•        countRaiting() – lets count the average rating.

Class Expansions should be derived from BaseGame.  So it has all base class characteristics. Except them it should have his own field content which contains the difference this extension from the base game. Also it has method getBaseGameName() which return the base game’s name.
Collection should have such fields:
•        gameList – should contains  the list of all games and their extensions (instances of previous classes);
•        collectionName – contains the name of collection.

Also this class should constructor that accepts one parameter of String type(it sets name).
Collection should have next methods:
•        addItem() – lets to add new item (instance of previous class) to collection;
•        isInCollection() – checks if some item is in collection;
•        countList() – lets to calculate the count of games in collection;
•        countBaseGames() – lets to calculate the count of Base Games in collection;
•        countExpansions() – lets to calculate the count of Base Games in collection.
