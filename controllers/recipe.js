const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES
let db = new sqlite3.Database('./db/db.myrecipes');
db.run("CREATE TABLE IF NOT EXISTS recipe(id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, Content TEXT, ingredients TEXT, rating INTEGER)");

const addRecipeDB = (recipecontrol, res) =>{
    // code to add to the database
      console.log("From the controller addRecipeDB ok, added :" )
      let db = new sqlite3.Database('./db/db.myrecipes');
  
    // insert one row into the langs table
      db.run(`INSERT INTO recipe(Title) VALUES(?)`, [recipecontrol.input], function(err) {
        if (err) {
          return console.log(err.message);
        }
    // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    //   res.send(res);
  
    // close the database connection
      db.close();
}

const loadRecipe = (res) => {
    let sendData = { recipesKey: [] };
    let sql = `SELECT * FROM recipe`;
    
    let db = new sqlite3.Database("db/db.myrecipes", (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Ok controllers loadRecipe connected to myrecipes database.");
    });

    db.serialize(() => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        rows.forEach((row) => {
            // console.log(row);
            sendData.recipesKey.push(row)
        });
      });
    //   res.send(sendData)
    });
  
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
    console.log(sendData, "well, well, well");
    res.send(sendData);
    console.log("Close the database connection.");
    });
};


  exports.addRecipeDB = addRecipeDB;
  exports.loadRecipe = loadRecipe;