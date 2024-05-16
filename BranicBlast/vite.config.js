
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config as dotenvConfig } from 'dotenv'; // Import from dotenv

dotenvConfig(); // Load environment variables

export default defineConfig({
  plugins: [react()],
  // ... your other Vite configuration
});