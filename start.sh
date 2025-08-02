#!/bin/bash

echo "Starting Coupon Manager Application..."
echo

echo "Starting Backend (Spring Boot)..."
cd coupon
gnome-terminal --title="Backend" -- bash -c "mvn spring-boot:run; exec bash" &
cd ..

echo
echo "Starting Frontend (React)..."
cd frontend
gnome-terminal --title="Frontend" -- bash -c "npm start; exec bash" &
cd ..

echo
echo "Both services are starting..."
echo "Backend will be available at: http://localhost:8080"
echo "Frontend will be available at: http://localhost:3000"
echo
echo "Press Ctrl+C to stop all services"
wait 