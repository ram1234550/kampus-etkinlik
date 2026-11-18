import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

// Önce veritabanı, sonra sunucu
try {
  await connectDatabase();
  app.listen(PORT, (error) => {
    if (error) {
      console.error(`Port ${PORT} kullanımda. Diğer terminali kapatın ya da .env'de portu değiştirin.`);
      process.exit(1);
    }
    console.log(`API: http://localhost:${PORT}`);
  });
} catch (err) {
  console.error(`Bağlanılamadı: ${err.message}`);
  process.exit(1);
}
