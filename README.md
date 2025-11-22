# Cold Banker - Real Estate Platform

A full-stack real estate web application built with React, Node.js, Express, and MongoDB. This platform allows users to browse, search, and manage property listings with features like image uploads, user authentication, and interactive maps.

## 🚀 Features

### Frontend

- Modern, responsive UI built with React and Styled Components
- Property listings with search and filtering
- Interactive property maps using Mapbox
- Image galleries and carousels
- Multi-language support (i18n)
- Form handling with validation
- Responsive design with Bootstrap 5
- Lazy loading for images and components
- Pagination for property listings

### Backend

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- User authentication with JWT
- File uploads with Cloudinary
- Email notifications with Nodemailer
- Security best practices (helmet, rate limiting, etc.)
- Request validation
- Logging with Winston

## 🛠️ Tech Stack

**Frontend:**

- React 18
- Vite
- React Router 6
- Styled Components
- Bootstrap 5
- React Hook Form
- i18next
- Mapbox GL
- Axios

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary
- Nodemailer
- Winston

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/TahaHamdy-MernDev/cold-well-banker.git
   cd cold-banker
   ```

2. **Set up the backend**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your configuration
   npm run dev
   ```

3. **Set up the frontend**

   ```bash
   cd ../client
   npm install
   cp .env.example .env
   # Update .env with your configuration
   npm run dev
   ```

4. **Open your browser**
   The application should be running at `http://localhost:5173`

## ⚙️ Environment Variables

### Backend (server/.env)

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES=90
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=your_email@example.com
```

### Frontend (client/.env)

```
VITE_API_URL=http://localhost:5000/api/v1
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

## 🧪 Running Tests

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd ../client
npm test
```

## 🛠️ Build for Production

```bash
# Build frontend for production
cd client
npm run build

# Start production server (from root directory)
cd ../server
npm start
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mapbox](https://www.mapbox.com/)
- [Vite](https://vitejs.dev/)

---

<div align="center">
  Made with ❤️ by Taha Hamdy
</div>
