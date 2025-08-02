@echo off
echo Starting Coupon Manager Application...
echo.

echo Starting Backend (Spring Boot)...
cd coupon
start "Backend" cmd /k "mvn spring-boot:run"
cd ..

echo.
echo Starting Frontend (React)...
cd frontend
start "Frontend" cmd /k "npm start"
cd ..

echo.
echo Both services are starting...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul 