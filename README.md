# Coupon Manager

A full-stack web application for securely storing, viewing, and managing discount codes and coupons. Built with Spring Boot backend and React frontend.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete coupons
- **Search & Filter**: Search by code, description, store, or category
- **Status Management**: Track active, used, expired, and expiring coupons
- **Dashboard**: Overview with statistics and recent coupons
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful and intuitive user interface

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven**

### Frontend
- **React 18**
- **React Router DOM**
- **Axios** for API calls
- **React Icons**
- **CSS3** with modern design

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CouponManager
```

### 2. Database Setup

1. Install and start MySQL server
2. Create a database (optional - will be created automatically):
   ```sql
   CREATE DATABASE coupon_manager;
   ```
3. Update database credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 3. Backend Setup

1. Navigate to the coupon directory (Spring Initializr project):
   ```bash
   cd coupon
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## Usage

### Dashboard
- View statistics (total, active, used, expiring coupons)
- Quick access to recent coupons
- Alerts for coupons expiring soon

### Adding Coupons
1. Click "Add New Coupon" or navigate to `/coupons/new`
2. Fill in the required fields:
   - **Coupon Code**: The actual discount code
   - **Store/Website**: Where the coupon can be used
   - **Description**: Brief description of the offer
   - **Discount Percentage**: The discount amount
3. Optional fields:
   - **Category**: Organize coupons by category
   - **Expiry Date**: When the coupon expires
   - **Notes**: Additional information or terms

### Managing Coupons
- **View All**: Browse all coupons with search and filters
- **Edit**: Modify coupon details
- **Mark as Used**: Track which coupons have been used
- **Delete**: Remove coupons from your collection

### Search & Filter
- **Search**: Find coupons by code, description, store, or category
- **Filter by Status**: 
  - All coupons
  - Active (not used, not expired)
  - Used coupons
  - Expired coupons
  - Expiring soon (within 7 days)

## API Endpoints

### Coupons
- `GET /api/coupons` - Get all coupons
- `GET /api/coupons/{id}` - Get coupon by ID
- `GET /api/coupons/code/{code}` - Get coupon by code
- `POST /api/coupons` - Create new coupon
- `PUT /api/coupons/{id}` - Update coupon
- `DELETE /api/coupons/{id}` - Delete coupon
- `PATCH /api/coupons/{id}/mark-used` - Mark coupon as used

### Filtered Endpoints
- `GET /api/coupons/active` - Get active coupons
- `GET /api/coupons/used` - Get used coupons
- `GET /api/coupons/expired` - Get expired coupons
- `GET /api/coupons/expiring-soon` - Get coupons expiring soon
- `GET /api/coupons/search?q={term}` - Search coupons
- `GET /api/coupons/store/{store}` - Get coupons by store
- `GET /api/coupons/category/{category}` - Get coupons by category

## Database Schema

### Coupons Table
```sql
CREATE TABLE coupons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200) NOT NULL,
    store VARCHAR(100) NOT NULL,
    discount_percentage DOUBLE NOT NULL,
    category VARCHAR(50),
    expiry_date DATE,
    is_used BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at DATE NOT NULL
);
```

## Project Structure

```
CouponManager/
├── coupon/                    # Spring Initializr Backend
│   ├── src/main/java/com/couponManager/coupon/
│   │   ├── CouponApplication.java
│   │   ├── controller/
│   │   │   └── CouponController.java
│   │   ├── model/
│   │   │   └── Coupon.java
│   │   ├── repository/
│   │   │   └── CouponRepository.java
│   │   └── service/
│   │       └── CouponService.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql
│   └── pom.xml
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── CouponList.js
│   │   │   ├── CouponForm.js
│   │   │   └── CouponDetail.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub. 