@echo off
title CHEEMA JEWELS - Full-Stack Local Server
echo ========================================================
echo   CHEEMA JEWELS - Haute Joaillerie Local Server
echo ========================================================
echo.
echo Starting Backend API (Port 5001) and Frontend (Port 5173)...
echo.
set "PATH=C:\Users\jaggi\.gemini\antigravity\scratch\tools\node;%PATH%"
cd /d "%~dp0"
start http://localhost:5173/
node start-dev.js
pause
