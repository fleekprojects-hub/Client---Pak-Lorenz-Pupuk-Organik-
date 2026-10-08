# Fleek Agri-Distribution Omni-Core — Pak Lorenz Executive Deck

Dokumen presentasi eksekutif dan demonstrasi solusi sistem interaktif untuk **Pak Lorenz** (Entitas PT Baru — Distribusi Pupuk & Chemicals Organik).

Dirancang khusus dengan estetika **Arasaka Cyber Dark (`#111110` base)** berpadu aksen **Organic Flora Green** (`#10b981`), **Harvest Gold** (`#f59e0b`), dan **Fleek Red** (`#FF0033`), tipografi **Outfit** & **Space Grotesk**, serta transisi animasi Anime.js.

---

## 🧭 Struktur 12 Slide Presentasi Eksekutif

| No | Slide ID | Judul & Fokus Utama |
| :---: | :--- | :--- |
| **01** | `opening` | **Executive Cover:** Branding resmi Fleek × Pak Lorenz, running ticker komoditas pupuk organik, Attn: Pak Lorenz. |
| **02** | `problem` | **Filosofi Tim Ramping (OPC):** Eliminasi pekerjaan klerikal sejak hari pertama, mengatasi fase "buta pasar", dan pemangkasan beban edukasi berulang. |
| **03** | `architecture` | **Arsitektur Dual-Engine:** Sayap 1 Mesin Ofensif (B2B Google Maps Scraper) + Sayap 2 Mesin Defensif (WhatsApp Frontline 24/7). |
| **04** | `offensive-scraper` | **Mesin Ofensif Deep-Dive:** Menjawab *"Kalau belum terkenal, siapa yang cari kami?"* melalui penyisiran Kios Saprotan, KUD, dan Toko Pakan Ternak secara legal (B2B). |
| **05** | `demo-scraper` | **🔥 LIVE DEMO 1:** Simulator B2B Google Maps Scraper (Karawang, Brebes, Malang), ekstraksi kontak, status verifikasi, dan ekspor ke Google Sheets. |
| **06** | `demo-whatsapp` | **🔥 LIVE DEMO 2:** Simulator WhatsApp Frontline ramah petani (Respon ringkas 2 baris, takaran dosis, campuran pakan ayam, uji petani skeptis, dan eskalasi grosir). |
| **07** | `knowledge-base` | **Knowledge Base via Google Sheets:** Sinkronisasi mandiri dosis & harga oleh tim pabrik tanpa koding atau prompt engineering yang rumit. |
| **08** | `e2e-journey` | **The Master End-to-End Journey:** Siklus 4 tahap dari scraper, kunjungan reseller, frontline WhatsApp, hingga uji lahan dan panen petani. |
| **09** | `limitation-matrix` | **Matriks Limitasi (Engine vs Human):** Transparansi tegas apa yang digantikan sistem (klerikal/scraping/FAQ) vs apa yang wajib dipegang manusia (uji lahan, negosiasi, keuangan). |
| **10** | `commercial-quote` | **Quotation Beli Putus All-in-One (Rp 35 Jt) & OpEx Transparan:** Skema saklek 2x termin (DP 50% Rp 17,5 Jt & Pelunasan 50% Rp 17,5 Jt), running cost server & AI ~Rp 370k–650k/bln. |
| **11** | `timeline` | **Roadmap 4 Minggu (Replikasi Kasus Sainsgo):** Mgg 1 Infra & Scraper, Mgg 2 Knowledge & Negative Test, Mgg 3 Soft Launch & Uji Lapangan, Mgg 4 Go-Live & Handover. |
| **12** | `closing-cta` | **Next Steps & Technical Handshake:** 3 Langkah konkrit menuju meeting lanjutan (Kamis 8 Okt / Minggu) untuk penyelarasan journey. |

---

## ⚡ Peta 2 Sayap Operasional (The Dual-Engine Highway)

```
[ PASAR DAERAH / KABUPATEN ]
            │
            ▼ (B2B Google Maps Scraper)
 [ GOOGLE SHEETS LEADS ] ──► [ TIM RESELLER / SALES ] ──► [ KUNJUNGAN TOKO & KUD ]
 (Kios Tani, KUD, Pakan)     (Rute Kunjungan Lapangan)     (Brosur & Sampel Produk)
                                                                     │
                                                                     ▼ Scan QR WA
                                                          [ FLEEK AI FRONTLINE ]
                                                          (WhatsApp Bot 24/7)
                                                                     │
                                   ┌─────────────────────────────────┴───────────────────┐
                                   ▼                                                     ▼
                         [ JAWAB FAQ & DOSIS ]                                 [ ORDER PARTNER GROSIR ]
                         (Ringkas 2 Baris / Pagi)                              (Handover ke Sales Manusia)
```

---

## 🛡️ Panduan Jawaban Taktis (Lead AI Engineer & AE)

### 1. "Kenapa tidak scraping langsung nomor HP petani perorangan?"
> *"Petani di pelosok tidak meninggalkan jejak digital di internet, Pak Lorenz. Selain itu, menyedot nomor pribadi perorangan melanggar UU PDP dan nomor WhatsApp perusahaan Bapak berisiko diblokir permanen oleh Meta karena dianggap spam ilegal. Solusi paling efektif dan legal adalah menyisir **titik simpul dagang: Kios Pupuk Resmi, Toko Saprotan, dan KUD**. Pemilik toko tani inilah yang memegang ratusan petani langganan di daerahnya."*

### 2. "Chatbot sebelumnya kaku dan jawabannya kepanjangan, ini bagaimana?"
> *"Kami mengatur sistem dengan **Extreme Brevity Guardrail**. AI dibatasi hanya menjawab inti pesan dalam 2 baris pendek menggunakan istilah yang akrab bagi petani (misal: '3 tutup botol per tangki 16 liter semprot pagi hari'). Tidak ada ceramah kimiawi yang berbelit-belit."*

### 3. "Saya mau tim seramping mungkin (OPC), apa batasan sistem ini?"
> *"Sistem kami menggantikan 100% beban staf klerikal: pencarian data toko, perapian spreadsheet, dan penerima tamu WhatsApp 24 jam. Yang tidak bisa digantikan AI dan wajib dipegang manusia hanya 2 hal: **orang lapangan yang membawa sampel untuk uji coba tanah** dan **negosiasi deal partai besar**."*

### 4. "Bagaimana update harga dan dosis kalau ada produk baru dari pabrik?"
> *"Pak Lorenz atau tim pabrik cukup membuka Google Sheets dari HP/laptop, lalu mengetik dosis atau harga baru di baris tabel. Detik itu juga bot AI langsung mengacu ke data terbaru tanpa perlu bantuan programmer."*

---

## 🚀 Panduan Menjalankan Presentasi Lokal & Deploy Vercel

### Menjalankan di Browser Lokal:
Buka berkas `index.html` langsung di browser Chrome/Safari:
```bash
open "/Users/haimac/Dimitri Ahmad/Fleek/Client - Pak Lorenz (Pupuk Organik)/index.html"
```

### Deploy ke Vercel (1 Menit):
```bash
cd "/Users/haimac/Dimitri Ahmad/Fleek/Client - Pak Lorenz (Pupuk Organik)"
npx vercel
```

---

*Confidential — PT Fleek Group Indonesia — Fleek Project 2026*
