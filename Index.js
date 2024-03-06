import  express  from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Proverbs",
    password: "patoduro",
    port: 5432,
   });
   
   const app = express();
   const port = 3000;

   db.connect();  
   let numbers = [];
    db.query("SELECT id FROM proverbs", (err, res)=>{
      if(err){
         console.error("Error executing the query", err.stack);
      } else{
           numbers = res.rows.length; 
      }
   }); 

   function randomNumber() {
    var numero = Math.floor(Math.random() * numbers);
    return numero;
   }

app.use(bodyParser.urlencoded({extended:true }));
app.use(express.static("public"));


app.get("/", async (req, res)=>{
   const numeros = randomNumber();
   var resultado = numeros;
   const proverbs = await db.query("SELECT proverbs, meaning FROM Proverbs WHERE id=$1",[resultado]);
   const result = proverbs.rows;
 res.render("Index.ejs",{proverb:result});
 console.log(result);
});


app.listen(port, ()=>{
console.log(`Server is running on port ${port}`);
});