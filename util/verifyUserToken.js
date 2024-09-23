// Temporarily bypass token verification for local testing
module.exports = (req, res, next) => {
    req.userUID = "test-user-id"; // Fake user ID for local testing
    next();
  };
  
  // Original Firebase token verification code (commented out)
   const admin = require("./firebase-admin-config");
  
   module.exports = (req, res, next) => {
     const token = req.headers.authorization;
     if (!token) {
       return res.status(401).json({ error: "Token no proporcionado" });
     }
     admin.auth()
       .verifyIdToken(token.replace("Bearer ", ""))
       .then((decodedToken) => {
         req.userUID = decodedToken.uid;
         next();
       })
       .catch((error) => {
         return res.status(401).json({ error: "Token inválido" });
       });
   };