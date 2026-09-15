import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('💎 Starting CHEEMA JEWELS Haute Joaillerie Full-Stack Application...');

const nodeExec = process.execPath;
const viteBin = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

// 1. Start Express Backend Server on Port 5001
console.log('🚀 [1/2] Launching Backend API Server (Port 5001)...');
const backend = spawn(nodeExec, ['server/index.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: { ...process.env, PORT: '5001' }
});

// 2. Start Vite Frontend Development Server on Port 5173
console.log('✨ [2/2] Launching Frontend Storefront & Admin Portal (Port 5173)...');
const frontend = spawn(nodeExec, [viteBin, '--host', '--port', '5173'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: process.env
});

// Handle termination
const cleanup = () => {
  console.log('\n🛑 Stopping CHEEMA JEWELS servers...');
  backend.kill();
  frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
