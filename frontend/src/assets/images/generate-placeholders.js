import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate a placeholder image
function generatePlaceholder(width, height, text, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background with a gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#4CAF50');
  gradient.addColorStop(1, '#2196F3');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(__dirname, filename), buffer);
}

// Generate all required images
const images = [
  { name: 'hero.jpg', width: 1920, height: 1080, text: 'Hero Image' },
  { name: 'how-it-works-1.jpg', width: 800, height: 600, text: 'How It Works 1' },
  { name: 'how-it-works-2.jpg', width: 800, height: 600, text: 'How It Works 2' },
  { name: 'how-it-works-3.jpg', width: 800, height: 600, text: 'How It Works 3' },
  { name: 'about-us.jpg', width: 1200, height: 800, text: 'About Us' },
  { name: 'testimonial-1.jpg', width: 400, height: 400, text: 'Testimonial 1' },
  { name: 'testimonial-2.jpg', width: 400, height: 400, text: 'Testimonial 2' },
  { name: 'testimonial-3.jpg', width: 400, height: 400, text: 'Testimonial 3' }
];

// Generate each image
images.forEach(img => {
  generatePlaceholder(img.width, img.height, img.text, img.name);
});

console.log('All placeholder images generated successfully!'); 