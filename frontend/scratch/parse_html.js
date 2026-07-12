const fs = require('fs');

async function parse() {
  const html = fs.readFileSync('scratch/page_source.html', 'utf8');
  
  // Find all script src attributes
  const regex = /<script[^>]+src=["']([^"']+)["']/g;
  let match;
  const urls = [];
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  
  console.log('Found scripts:', urls);

  // Let's also look for any links to main files
  const linkRegex = /<link[^>]+href=["']([^"']+)["']/g;
  while ((match = linkRegex.exec(html)) !== null) {
    if (match[1].endsWith('.js') || match[1].includes('assets/')) {
      urls.push(match[1]);
    }
  }

  // Now, fetch each script and search for "Soft Aurora" or "colorStops" inside it
  for (const path of urls) {
    const fullUrl = path.startsWith('http') ? path : 'https://reactbits.dev' + path;
    console.log(`Fetching script: ${fullUrl}...`);
    try {
      const res = await fetch(fullUrl);
      const code = await res.text();
      if (code.includes('SoftAurora') || code.includes('Soft Aurora') || code.includes('colorStops')) {
        console.log(`FOUND CODE IN: ${fullUrl}`);
        // Let's write the matching code snippet or the whole file to scratch/found_bundle.js
        fs.writeFileSync('scratch/found_bundle.js', code);
        
        // Let's find where the component is defined
        const index = code.indexOf('colorStops');
        console.log(`Snippet around colorStops: \n${code.substring(index - 500, index + 1000)}`);
      }
    } catch (e) {
      console.error(`Failed to fetch ${fullUrl}:`, e);
    }
  }
}

parse();
