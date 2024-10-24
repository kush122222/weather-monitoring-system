Weather Monitoring System
A real-time weather monitoring system that fetches and processes weather data from the OpenWeatherMap API, stores it in MongoDB, and displays visualizations of daily weather summaries and alerts.


Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/weather-monitoring-system.git
cd weather-monitoring-system
Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install the dependencies:


npm install
Run the frontend server:


npm start
The frontend will be running on http://localhost:3000.

Backend Setup


Navigate to the backend folder:

cd backend

Set up a Python virtual environment (optional but recommended):

python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install the dependencies:




MONGODB_URI=mongodb://localhost:27017/weather_monitoring_system
OPENWEATHERMAP_API_KEY=dbee8b047171a48092384431501a2698
PORT=5005

Run the backend server using nodemon:


nodemon src/index.js
The backend will be running on http://localhost:5005.

MongoDB Setup
To allow other users to connect to the MongoDB instance, follow these steps:

1. Install MongoDB
Ubuntu:


sudo apt update
sudo apt install -y mongodb

macOS (using Homebrew):

brew tap mongodb/brew
brew install mongodb-community

Windows:

Download and install MongoDB from MongoDB official website.

2. Configure MongoDB for External Connections
Edit the MongoDB configuration file (mongod.conf) and update the bindIp to allow external connections:

yaml

bindIp: 0.0.0.0
Restart MongoDB to apply changes:


sudo systemctl restart mongod
Enable MongoDB Authentication:

Open the MongoDB shell:

bash
Copy code
mongosh
Switch to the admin database and create an administrative user:



use admin
db.createUser({
  user: "admin",
  pwd: "password123",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
})
Create a user for the weather_monitoring_system database:


use weather_monitoring_system
db.createUser({
  user: "externalUser",
  pwd: "securePassword",
  roles: [ { role: "readWrite", db: "weather_monitoring_system" } ]
})
Enable authentication in the mongod.conf file:

yaml

security:
  authorization: "enabled"
Restart MongoDB:

bash
Copy code
sudo systemctl restart mongod

3. Open MongoDB Port
To allow external users to connect, open the MongoDB port (27017):

Ubuntu:

bash

sudo ufw allow 27017/tcp
CentOS:

bash

sudo firewall-cmd --zone=public --add-port=27017/tcp --permanent
sudo firewall-cmd --reload
4. Provide Connection Details
Share the MongoDB connection string with external users:

bash

mongodb://externalUser:securePassword@your-server-ip:27017/weather_monitoring_system?authSource=admin
Replace your-server-ip with the actual IP of the server hosting MongoDB.
Ensure externalUser and securePassword match the credentials created earlier.

5. Update the .env File
In the backend's .env file, update the MONGODB_URI to the remote MongoDB instance:

bash
Copy code
MONGODB_URI=mongodb://externalUser:securePassword@your-server-ip:27017/weather_monitoring_system?authSource=admin
Running the Project
Start MongoDB (if not already running):

bash
Copy code
sudo systemctl start mongod
Navigate to the backend folder and run the backend server:

bash
Copy code
nodemon src/index.js
In a separate terminal, navigate to the frontend folder and run the frontend server:

bash
Copy code
npm start
By following these steps, users will be able to set up MongoDB, connect the project to it, and run both the backend and frontend of the Weather Monitoring System.

This README structure provides clear steps for both setting up the project locally and configuring MongoDB for external access. Feel free to customize it further based on your project’s needs.
