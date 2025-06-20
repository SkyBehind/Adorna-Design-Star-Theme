import Papa from 'papaparse';

export async function loadEarrings() {
  try {
    console.log("Starting to load earrings data...");
    
    // Load CSV data
    const csvResponse = await fetch('/data/earring_attributes.csv');
    const csvText = await csvResponse.text();
    console.log("CSV loaded, length:", csvText.length);
    
    // Parse CSV
    const csvData = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });
    console.log("CSV parsed, rows:", csvData.data.length);
    console.log("First row sample:", csvData.data[0]);

    // Load descriptions
    const txtResponse = await fetch('/data/earring_descriptions.txt');
    const txtText = await txtResponse.text();
    console.log("TXT loaded, length:", txtText.length);
    
    // Parse descriptions (assuming format: filename: description)
    const descriptions = {};
    txtText.split('\n').forEach(line => {
      const [filename, ...descParts] = line.split(':');
      if (filename && descParts.length > 0) {
        descriptions[filename.trim()] = descParts.join(':').trim();
      }
    });
    console.log("Descriptions parsed, count:", Object.keys(descriptions).length);

    // Map collections based on materials or colors
    const getCollection = (row) => {
      const material = (row.Material || "").toLowerCase();
      const color = (row["Color Palette"] || "").toLowerCase();
      const theme = (row["Theme or Motif"] || "").toLowerCase();
      const filename = (row.Filename || "").toLowerCase();
      
      // Dice category - check for dice in theme/motif or filename
      if (theme.includes("dice") || theme.includes("gaming") || filename.includes("dice")) return "Dice";
      
      // Beaded Collection - earrings with beads
      if (material.includes("bead") || material.includes("pearl")) return "Beaded Collection";
      
      // Silver Series - silver wire earrings
      if (material.includes("silver") && (material.includes("wire") || material.includes("metal"))) return "Silver Series";
      
      // Signature Collection - brass and copper earrings
      if (material.includes("copper") || material.includes("brass")) return "Signature Collection";
      
      // Natural Elements - wood, leather, shell/seashell
      if (material.includes("wood") || material.includes("leather") || material.includes("shell") || material.includes("seashell")) return "Natural Elements";
      
      // Ocean Whispers - blue/green/ocean colors and ocean themes
      if (color.includes("blue") || color.includes("green") || theme.includes("ocean") || theme.includes("seashell") || theme.includes("jellyfish")) return "Ocean Whispers";
      
      return "Signature Collection";
    };

    // Merge data - create format that Gallery component expects
    const earrings = csvData.data.map(row => {
      // Extract the filename 
      const filename = row.Filename || '';
      
      // Create artwork object with the expected structure
      return {
        filename: filename.replace(/\.jpg$|\.jpeg$/i, ''),
        title: filename.replace(/\.jpg$|\.jpeg$/i, '')
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' '),
        medium: 'Handcrafted Earrings',
        materials: row.Material || 'Mixed Materials',
        dimensions: row.Size || 'Standard',
        artistStatement: descriptions[filename] || 'A beautiful handcrafted piece made with love and attention to detail.',
        image: `/images/${filename}`,  // Use the full filename including extension
        collection: getCollection(row),
        year: '2024'
      };
    });
    
    console.log("Earrings processed, count:", earrings.length);
    if (earrings.length > 0) {
      console.log("First earring sample:", earrings[0]);
    } else {
      console.log("No earrings data was processed!");
    }

    return earrings;
  } catch (error) {
    console.error('Error loading earring data:', error);
    throw error;
  }
}