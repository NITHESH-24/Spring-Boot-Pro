 HEAD
# Quick Start Guide

Get the Coupon Manager application running in 5 minutes!

## Prerequisites Check

Make sure you have the following installed:
- ✅ Java 17+ (`java -version`)
- ✅ Node.js 16+ (`node -v`)
- ✅ MySQL 8.0+ running
- ✅ Maven 3.6+ (`mvn -v`)
## Quick Setup

### 1. Database Setup
1. Start MySQL server
2. Create database (optional - auto-created):
   ```sql
   CREATE DATABASE coupon_manager;
   ```
3. Update credentials in `backend/src/main/resources/application.properties`

### 2. Start Backend
```bash
cd coupon
mvn spring-boot:run
```
✅ Backend running at http://localhost:8080

### 3. Start Frontend
```bash
cd frontend
npm install
npm start
```
✅ Frontend running at http://localhost:3000

### 4. Alternative: Use Start Scripts
- **Windows**: Double-click `start.bat`
- **Linux/Mac**: Run `./start.sh`

## Test the Application

1. Open http://localhost:3000 in your browser
2. You'll see the dashboard with sample data
3. Try adding a new coupon
4. Test search and filter functionality

## Sample Data

The application comes with 10 sample coupons for testing:
- Amazon: SAVE20 (20% off electronics)
- Walmart: WELCOME10 (10% off for new customers)
- Nike: SPRING25 (25% off spring collection)
- And more...

## Troubleshooting

### Backend Issues
- Check MySQL is running
- Verify database credentials
- Check port 8080 is available

### Frontend Issues
- Run `npm install` if dependencies missing
- Check port 3000 is available
- Clear browser cache if needed

### Common Errors
- **"Connection refused"**: Backend not running
- **"Module not found"**: Run `npm install`
- **"Database connection failed"**: Check MySQL credentials

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize the application for your needs

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the full README.md
=======
# Quick Start Guide

Get the Coupon Manager application running in 5 minutes!

## Prerequisites Check

Make sure you have the following installed:
- ✅ Java 17+ (`java -version`)
- ✅ Node.js 16+ (`node -v`)
- ✅ MySQL 8.0+ running
- ✅ Maven 3.6+ (`mvn -v`)

## Quick Setup

### 1. Database Setup
1. Start MySQL server
2. Create database (optional - auto-created):
   ```sql
   CREATE DATABASE coupon_manager;
   ```
3. Update credentials in `backend/src/main/resources/application.properties`

### 2. Start Backend
```bash
cd coupon
mvn spring-boot:run
```
✅ Backend running at http://localhost:8080

### 3. Start Frontend
```bash
cd frontend
npm install
npm start
```
✅ Frontend running at http://localhost:3000

### 4. Alternative: Use Start Scripts
- **Windows**: Double-click `start.bat`
- **Linux/Mac**: Run `./start.sh`

## Test the Application

1. Open http://localhost:3000 in your browser
2. You'll see the dashboard with sample data
3. Try adding a new coupon
4. Test search and filter functionality

## Sample Data

The application comes with 10 sample coupons for testing:
- Amazon: SAVE20 (20% off electronics)
- Walmart: WELCOME10 (10% off for new customers)
- Nike: SPRING25 (25% off spring collection)
- And more...

## Troubleshooting

### Backend Issues
- Check MySQL is running
- Verify database credentials
- Check port 8080 is available

### Frontend Issues
- Run `npm install` if dependencies missing
- Check port 3000 is available
- Clear browser cache if needed

### Common Errors
- **"Connection refused"**: Backend not running
- **"Module not found"**: Run `npm install`
- **"Database connection failed"**: Check MySQL credentials

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize the application for your needs

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the full README.md
 f06af3865f05ae250b25f44e50f009ca3d22307c
3. Open an issue on GitHub 