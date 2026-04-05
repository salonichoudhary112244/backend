// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': 'http://localhost:8080',
      '/api': 'http://localhost:8080',
      '/packages': 'http://localhost:8080',
      '/bookings': 'http://localhost:8080'
    }
  }
})