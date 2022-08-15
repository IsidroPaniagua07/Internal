import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './HomePage'
import SideBar from './SideBar/SideBar';
import Admin from './Admin/Admin'
import Events from './Events/Events';
import Login from './Login/Login';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./Login/authConfig";
import EventPage from './Events/EventPage';
const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Router>
    <SideBar />
    <div className=" w-full h-full">
      {/* <MsalProvider instance={msalInstance}> */}
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventPage />} />
            <Route path="*" element={<h1 className="w-full text-center mt-10 font-bold text-4xl">404 - Invalid Url</h1>}/>
        </Routes>        
      {/* </MsalProvider> */}
    </div>
  </Router>
  </>
);

