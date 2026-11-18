import dns from "node:dns";
import mongoose from "mongoose";

// Veritabanına bağlanır; adres sadece .env'deki MONGODB_URI'den gelir
export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI tanımlı değil");
  }

  // Atlas (mongodb+srv) adresi SRV kaydıyla çözülür. Bazı ağlarda ve
  // Windows'ta varsayılan DNS bu sorguyu yanıtlamıyor (querySrv EBADRESP);
  // bu yüzden SRV sorguları için genel DNS sunucuları kullanılır.
  if (uri.startsWith("mongodb+srv://")) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }

  await mongoose.connect(uri);

  // uri yazdırılmaz (içinde şifre var); sadece host ve veritabanı adı
  const { host, name } = mongoose.connection;
  const yer = uri.startsWith("mongodb+srv://") ? "Atlas" : "yerel";
  console.log(`MongoDB bağlandı (${yer}): ${host}/${name}`);
}
