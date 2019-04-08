import React from 'react';
import { Link } from 'react-router-dom'; 

const Home = () => (
  <div className="home">
    <h1>Welcome to the CRM Demo</h1>
    <Link to='/settings'>Click here or navigate to Settings to get started</Link>
  </div>
)

export default Home