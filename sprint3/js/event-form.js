import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleMi = form.dataset.mode === "guncelle";
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

let mevcut = null;
let formVar = true;

// Güncelleme sayfası: adresteki id ile formu doldur
if (guncelleMi) {
  const id = new URLSearchParams(location.search).get("id");
  mevcut = events.find((e) => e.id === id);

  if (mevcut) {
    form.elements.ad.value = mevcut.title;
    form.elements.kategori.value = mevcut.category;
    form.elements.tarih.value = mevcut.date;
    form.elements.saat.value = mevcut.time;
    form.elements.yer.value = mevcut.location;
    form.elements.kontenjan.value = mevcut.capacity ?? "";
    form.elements.aciklama.value = mevcut.description;
  } else {
    const uyari = document.createElement("div");
    uyari.innerHTML = `
      <p class="mesaj mesaj-hata">Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      <a class="buton" href="etkinlikler.html">Etkinliklere git</a>`;
    document.querySelector("#form-bilgi")?.remove();
    mesaj.remove();
    form.replaceWith(uyari);
    formVar = false;
  }
}

if (formVar) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const kontenjanMetni = fd.get("kontenjan").trim();

    // Formdaki adlar Türkçe, nesnenin alanları data.js gibi İngilizce
    const data = {
      id: guncelleMi ? mevcut.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      capacity: kontenjanMetni === "" ? null : Number(kontenjanMetni),
      description: fd.get("aciklama").trim(),
    };

    // Kontrol: hataları topla
    const errors = {};
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (
      data.capacity !== null &&
      !(Number.isInteger(data.capacity) && data.capacity >= 1 && data.capacity <= 1000)
    ) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
    }

    // Hatalı alanı kırmızı yap, düzeltileni temizle
    alanlar.forEach((ad) => {
      const alan = form.elements[ad];
      const hataYeri = document.querySelector(`#${ad}-hata`);
      if (errors[ad]) {
        alan.setAttribute("aria-invalid", "true");
        hataYeri.textContent = errors[ad];
      } else {
        alan.removeAttribute("aria-invalid");
        hataYeri.textContent = "";
      }
    });

    if (Object.keys(errors).length > 0) {
      mesaj.className = "mesaj mesaj-hata";
      mesaj.textContent = "Formda hatalı alanlar var. Kırmızı alanları düzeltin.";
      return;
    }

    // Başarı: yeşil kutu + nesne (kaydedilmez)
    console.log(data);
    mesaj.className = "mesaj mesaj-basari";
    mesaj.innerHTML = "<p></p><pre></pre>";
    mesaj.querySelector("p").textContent = guncelleMi
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
    mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
  });
}
