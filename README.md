## Node.js Assignment – API and Frontend Implementation

### API Endpoints

1. **List Schools**  
   Retrieves a list of schools based on geolocation coordinates.  
   **Endpoint:**  
   [`https://nodejs-assignment-backend-f3e6.onrender.com/listSchools?lat=10&lng=30`](https://nodejs-assignment-backend-f3e6.onrender.com/listSchools?lat=10&lng=30)

2. **Add School**  
   Adds a new school to the database.  
   **Endpoint:**  
   [`https://nodejs-assignment-backend-f3e6.onrender.com/addSchool`](https://nodejs-assignment-backend-f3e6.onrender.com/addSchool)

### Frontend Application

Since Node.js cannot access geolocation data directly from the backend, I have implemented a frontend application that interacts with the above endpoints and handles geolocation through the browser.

**Frontend Repository:**  
[https://github.com/Calcifer077/NodeJS_assignment_frontend](https://github.com/Calcifer077/NodeJS_assignment_frontend)

### Database

I initially planned to use Microsoft SQL Server for the SQL database functionality. However, due to hosting limitations, I have used **Supabase**, which offers SQL-based backend capabilities, as the database solution for this project.
