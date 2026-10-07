import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// "2026-10-12" + "14:00" -> "12 Ekim 2026, 14:00"
function tarihMetni(event) {
  const tarih = new Date(`${event.date}T${event.time}`);
  const gun = tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${gun}, ${event.time}`;
}

function createCard(event) {
  return `<article class="kart">
    <h3>${event.title}</h3>
    <p class="rozet">${event.category}</p>
    <p>Tarih: ${tarihMetni(event)}</p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

function filtreyiHazirla() {
  const form = document.querySelector("#filtre-formu");
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategorileri veriden üret, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.textContent = kategori;
    kategoriSecimi.append(option);
  });

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.category} ${e.description}`.toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    filtrele();
  });

  filtrele();
}

if (list.dataset.limit) {
  // Ana sayfa: tarihi en yakın N etkinlik
  const yaklasan = [...events]
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  // Liste sayfası: hepsi + filtre
  render(events);
  filtreyiHazirla();
}
