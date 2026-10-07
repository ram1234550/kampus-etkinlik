import { events } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

const id = new URLSearchParams(location.search).get("id");
const etkinlik = events.find((e) => e.id === id);

function tarihMetni(event, uzun = true) {
  const tarih = new Date(`${event.date}T${event.time}`);
  const secenek = uzun
    ? { day: "numeric", month: "long", year: "numeric" }
    : { day: "numeric", month: "long" };
  return tarih.toLocaleDateString("tr-TR", secenek);
}

if (!etkinlik) {
  // Önce kontrol: bulunamazsa hata kutusu
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `
    <p class="mesaj mesaj-hata"></p>
    <a class="buton" href="etkinlikler.html">← Listeye dön</a>`;
  container.querySelector(".mesaj-hata").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Etkinlik seçilmedi. Listeden bir etkinlik seçin.";
} else {
  document.title = etkinlik.title;
  baslik.textContent = etkinlik.title;
  container.innerHTML = `
    <article class="detay">
      <figure>
        <div class="afis" role="img" aria-label="${etkinlik.title} afişi">
          <p class="afis-baslik">${etkinlik.title}</p>
          <p class="afis-alt">${tarihMetni(etkinlik, false)} · ${etkinlik.location}</p>
        </div>
        <figcaption>${etkinlik.title} afişi</figcaption>
      </figure>

      <div>
        <div class="kunye-kutu">
          <h2>Etkinlik Künyesi</h2>
          <dl class="kunye">
            <dt>Tarih</dt>
            <dd><time datetime="${etkinlik.date}T${etkinlik.time}">${tarihMetni(etkinlik)}, ${etkinlik.time}</time></dd>
            <dt>Yer</dt>
            <dd>${etkinlik.location}</dd>
            <dt>Kategori</dt>
            <dd>${etkinlik.category}</dd>
            <dt>Kontenjan</dt>
            <dd>${etkinlik.capacity} kişi</dd>
          </dl>
        </div>

        <h2>Açıklama</h2>
        <p>${etkinlik.description}</p>

        <p class="butonlar">
          <a class="buton" href="etkinlikler.html">← Listeye dön</a>
          <a class="buton" href="etkinlik-guncelle.html?id=${etkinlik.id}">Bu etkinliği güncelle</a>
        </p>
      </div>
    </article>`;
}
