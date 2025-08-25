@echo off
:: Proje güncelleme scripti
:: GitHub master branch'e push eder

echo ----------------------------
echo   Proje GitHub'a gonderiliyor
echo ----------------------------

:: Değişiklikleri ekle
git add .

:: Commit mesajı zaman damgalı
for /f "tokens=1-4 delims=:. " %%a in ("%time%") do (
    set HOUR=%%a
    set MINUTE=%%b
    set SECOND=%%c
)
set TIMESTAMP=%date% %HOUR%:%MINUTE%:%SECOND%
git commit -m "update - %TIMESTAMP%"

:: Master branch'e gönder
git push origin master

echo ----------------------------
echo   Guncelleme tamamlandi!
echo ----------------------------
pause
