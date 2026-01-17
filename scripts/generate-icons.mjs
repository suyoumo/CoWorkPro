// Generate icons for Windows taskbar
import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const buildDir = join(projectRoot, 'build');
const publicIconPath = join(projectRoot, 'public', 'icon.png');

// Create build directory if not exists
if (!existsSync(buildDir)) {
    mkdirSync(buildDir, { recursive: true });
    console.log('Created build directory');
}

// Copy PNG to build directory  
const buildIconPng = join(buildDir, 'icon.png');
if (!existsSync(buildIconPng)) {
    copyFileSync(publicIconPath, buildIconPng);
    console.log('Copied icon.png to build directory');
}

// Generate ICO using png-to-ico
const buildIconIco = join(buildDir, 'icon.ico');
if (!existsSync(buildIconIco)) {
    try {
        console.log('Generating icon.ico (this may take a while for large images)...');
        execSync(`npx -y png-to-ico "${publicIconPath}" > "${buildIconIco}"`, {
            cwd: projectRoot,
            stdio: 'inherit',
            timeout: 300000 // 5 minutes timeout
        });
        console.log('Generated icon.ico');
    } catch (e) {
        console.error('Failed to generate icon.ico:', e.message);
        console.log('Please manually create build/icon.ico');
    }
}

console.log('Done!');
