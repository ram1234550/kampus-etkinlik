import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  // Express 5: port doluysa hata buraya gelir (EADDRINUSE)
  if (error) {
    console.error(`Port ${PORT} kullanımda. Diğer terminali kapatın ya da .env'de portu değiştirin.`);
    process.exit(1);
  }
  console.log(`API: http://localhost:${PORT}`);
});
