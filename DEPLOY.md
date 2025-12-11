# Panduan Deploy ke Vercel

## 🆓 100% GRATIS!

Vercel **benar-benar GRATIS** untuk personal projects! Tidak ada biaya tersembunyi.

Lihat [HOSTING-GRATIS.md](./HOSTING-GRATIS.md) untuk semua opsi hosting gratis.

## ✅ Konfirmasi: Website Siap Deploy!

Website ini **100% siap** untuk deploy di Vercel dengan fitur:
- ✅ Login berfungsi
- ✅ Register berfungsi  
- ✅ Database localStorage bisa diakses
- ✅ Semua halaman menggunakan client-side rendering

## 🚀 Cara Deploy ke Vercel

### Metode 1: Via Dashboard Vercel (Recommended)

1. **Buka https://vercel.com** dan login dengan GitHub

2. **Klik "Add New Project"**

3. **Import Repository:**
   - Pilih repository `Yesayaparapat/wirausaha`
   - Klik "Import"

4. **Konfigurasi Project (PENTING!):**
   - **Framework Preset:** Next.js (auto-detect)
   - **Root Directory:** `.` (kosongkan atau biarkan default)
   - **Build Command:** `npm run build` (atau biarkan kosong untuk auto)
   - **Output Directory:** **KOSONGKAN!** (JANGAN isi `out`)
   - **Install Command:** Biarkan default/auto

5. **Klik "Deploy"**

### Metode 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (pilih akun Anda)
# - Link to existing project? N
# - Project name? wirausaha
# - Directory? ./
```

## ⚠️ Troubleshooting

### Error: "routes-manifest.json couldn't be found"

**Solusi:**
1. Pastikan **Output Directory dikosongkan** di Settings → Build & Output Settings
2. Hapus deployment yang gagal
3. Buat deployment baru

### Build Berhasil Tapi Website Error

- Pastikan semua halaman menggunakan `'use client'` (sudah benar)
- localStorage hanya bekerja di browser (client-side), ini sudah benar

## 📝 Cara Kerja Database (localStorage)

- **Data disimpan di browser** pengguna (localStorage)
- **Setiap browser/device memiliki data terpisah**
- **Data tidak tersinkronisasi** antar device
- **Data akan hilang** jika user clear browser data

### Struktur Data:

```javascript
// Key: 'wirausaha_users'
// Value: Array of users
[
  {
    id: "1234567890",
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  }
]

// Key: 'wirausaha_current_user'  
// Value: Current logged in user (tanpa password)
{
  id: "1234567890",
  name: "John Doe",
  email: "john@example.com"
}
```

## ✅ Testing Setelah Deploy

1. Buka URL Vercel yang diberikan
2. Klik "Daftar" dan buat akun baru
3. Login dengan akun yang baru dibuat
4. Cek Dashboard - harus menampilkan info user
5. Logout dan login lagi - harus berfungsi

## 🎉 Selesai!

Website Anda sekarang live di Vercel dengan:
- ✅ Login & Register berfungsi
- ✅ Database localStorage bisa diakses
- ✅ UI modern dan responsive

