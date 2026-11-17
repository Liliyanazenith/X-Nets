# X'Nest (tanpa server)

<p align="center">
  <img src="https://i.ibb.co/BHCbJBfk/savetok-7694199220236078344-foto3.jpg" alt=". scarlett ." width="100%">
</p>

Website statis + Supabase. Tidak ada perintah yang perlu dijalankan.

## Setup (sekali saja)

1. Supabase > Authentication > Providers > Email: matikan "Confirm email".
2. Supabase > SQL Editor: tempel isi `setup.sql`, lalu Run.
3. Upload `index.html` ke hosting statis (Netlify Drop, GitHub Pages, atau Cloudflare Pages).
4. Buka situsnya dan daftar dulu dengan websitescarlett@gmail.com. Akun itu otomatis dev (centang biru, gelar Dev Web, Menu dev). Daftar akun dev sebelum membagikan link ke orang lain.

## Catatan

- URL dan kunci publishable ada di bagian atas script `index.html`. Aman dipublikasikan karena semua tabel dikunci RLS. Jangan pernah menaruh Secret key di file ini.
- Login memakai email dan sandi.
- Foto dan video diunggah ke Supabase Storage (bucket `media`). Aplikasi tidak membatasi ukuran; batas per file mengikuti pengaturan Storage project (Free: 50 MB, ubah di Storage > Settings).
