import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = ['https://render-project-frontend1.onrender.com'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like curl, postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // if you need to send cookies/auth headers
}));


app.use(express.json());

// Dummy users data
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" }
];

// Users route
app.get("/api/v1/users", (req, res) => {
  res.json(users);
});


// RENDER escucha todos los puertos - https://render.com/docs/web-services#port-binding
// Agregar un environment variable en render de PORT: 10000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});