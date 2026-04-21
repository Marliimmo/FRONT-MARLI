import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { HelmetProvider } from 'react-helmet-async'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider><RouterProvider router={router}></RouterProvider></HelmetProvider>
  </React.StrictMode>
)
// Force redeploy Thu Oct 23 19:35:03     2025
