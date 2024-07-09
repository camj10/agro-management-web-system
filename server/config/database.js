import mysql from 'mysql';

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scagr"
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

export default con;
