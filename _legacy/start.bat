@echo off
echo Starting local development server...
echo.
echo Opening localhost:8080 in your default browser...
echo.

WHERE npx >nul 2>nul
IF %ERRORLEVEL% EQU 0 (
    npx -y http-server . -o -c-1
) ELSE (
    echo Node.js not found, trying Python...
    WHERE python >nul 2>nul
    IF %ERRORLEVEL% EQU 0 (
        start http://localhost:8000
        python -m http.server 8000
    ) ELSE (
        echo Error: Neither Node.js nor Python were found.
        echo Please install Node.js to run this project properly.
        pause
    )
)
