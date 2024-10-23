import React, { useEffect, useState } from 'react';
import { fetchAlerts } from '../services/apiService';

const AlertsTable = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const getAlerts = async () => {
      const alertsData = await fetchAlerts();
      setAlerts(alertsData);
    };
    getAlerts();
  }, []);

  return (
    <div>
      <h3>Weather Alerts</h3>
      {alerts.length === 0 ? (
        <p>No alerts available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Condition</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert._id}>
                <td>{alert.city}</td>
                <td>{alert.temperature.toFixed(2)}°C</td>
                <td>{alert.condition}</td>
                <td>{new Date(alert.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AlertsTable;