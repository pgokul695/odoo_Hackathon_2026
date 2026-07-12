const fs = require('fs');

function extract() {
  const code = fs.readFileSync('scratch/found_bundle.js', 'utf8');
  
  // Let's find occurrences of "colorStops"
  let index = 0;
  while (true) {
    const idx = code.indexOf('colorStops', index);
    if (idx === -1) break;
    console.log(`Found colorStops at index ${idx}`);
    // Print around this index
    console.log('--- SNIPPET ---');
    console.log(code.substring(idx - 200, idx + 1000));
    console.log('---------------\n');
    index = idx + 1;
    if (index > code.length) break;
  }
}

extract();
