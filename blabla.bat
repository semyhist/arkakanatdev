@echo off
REM === Proje klasörüne git ===
cd /d "C:\Users\HP\Desktop\akweb"

REM === Git başlat (sadece ilk seferde lazım, sonrasında gerek yok) ===
git init

REM === Dosyaları ekle ===
git add .

REM === İlk commit ===
git commit -m "İlk yükleme"

REM === Uzak repo ekle (Kendi GitHub adresini buraya yaz) ===
git remote add origin https://github.com/semyhist/arkakanat-app.git

REM === Branch belirt (main olarak) ===
git branch -M main

REM === GitHub’a gönder ===
git push -u origin main

pause
