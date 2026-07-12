const fs = require('fs');

async function fetchCode() {
  try {
    const url = 'https://reactbits.dev/backgrounds/soft-aurora';
    console.log(`Fetching ${url}...`);
    const res = await fetch(url);
    const text = await res.text();
    
    // Write text to a file so we can view it
    fs.writeFileSync('scratch/page_source.html', text);
    console.log('Successfully saved page source to scratch/page_source.html');
  } catch (err) {
    console.error('Error fetching page:', err);
  }
}

fetchCode();
