@echo off
title Push Problex AI to GitHub
color 0B
echo ========================================================
echo   Pushing PROBLEX AI to GitHub (Main Branch)
echo ========================================================
echo.
echo Project Folder: C:\Users\HP\OneDrive\Desktop\problex.ai
echo Repository:     https://github.com/saiprakash010729-boop/problex.ai.git
echo.
echo If a GitHub login window opens, click "Sign in with your browser"
echo.
cd /d "C:\Users\HP\OneDrive\Desktop\problex.ai"
git push -u origin main
echo.
echo ========================================================
echo   Done! Check the output above.
echo ========================================================
echo.
pause
