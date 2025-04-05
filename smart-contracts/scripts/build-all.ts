import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Script to build all programs and generate TypeScript interfaces

async function main() {
  try {
    console.log('Building Anchor programs...');
    execSync('anchor build', { stdio: 'inherit' });
    
    console.log('Generating TypeScript interfaces...');
    execSync('npm run generate-idl', { stdio: 'inherit' });
    
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Error during build:', error);
    process.exit(1);
  }
}

// Run the main function
main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
