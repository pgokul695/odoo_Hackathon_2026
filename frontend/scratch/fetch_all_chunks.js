const fs = require('fs');
const path = require('path');

async function downloadAndScan() {
  const bundle = fs.readFileSync('scratch/found_bundle.js', 'utf8');
  
  // Extract all assets matching /assets/*.js
  const regex = /"assets\/[^"]+\.js"/g;
  let match;
  const files = new Set();
  while ((match = regex.exec(bundle)) !== null) {
    files.add(match[0].replace(/"/g, ''));
  }
  
  console.log(`Found ${files.size} asset files in bundle`);
  
  if (!fs.existsSync('scratch/chunks')) {
    fs.mkdirSync('scratch/chunks');
  }

  for (const file of files) {
    const filename = path.basename(file);
    const chunkPath = path.join('scratch/chunks', filename);
    const url = `https://reactbits.dev/${file}`;
    
    // Check if we already have it
    if (fs.existsSync(chunkPath)) {
      const content = fs.readFileSync(chunkPath, 'utf8');
      if (content.includes('colorStops') || content.includes('color1') || content.includes('color2') || content.includes('aurora') || content.includes('Aurora')) {
        console.log(`FOUND KEYWORDS IN CACHED: ${filename}`);
        if (content.includes('colorStops')) {
          console.log(`FOUND colorStops IN ${filename}`);
          fs.writeFileSync('scratch/aurora_chunk.js', content);
        }
      }
      continue;
    }

    try {
      console.log(`Fetching chunk ${url}...`);
      const res = await fetch(url);
      const content = await res.text();
      fs.writeFileSync(chunkPath, content);
      
      if (content.includes('colorStops') || content.includes('color1') || content.includes('color2') || content.includes('aurora') || content.includes('Aurora')) {
        console.log(`FOUND KEYWORDS IN NEW CHUNK: ${filename}`);
        if (content.includes('colorStops')) {
          console.log(`FOUND colorStops IN ${filename}`);
          fs.writeFileSync('scratch/aurora_chunk.js', content);
        }
      }
    } catch (e) {
      console.error(`Failed to fetch chunk ${url}:`, e);
    }
  }
}

downloadAndScan();
