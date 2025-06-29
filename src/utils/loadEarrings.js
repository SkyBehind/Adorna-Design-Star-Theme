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

    // Define images to exclude (specific product names) - all lowercase to match filtering logic
    const excludedImages = [
      'brown_orange_red_white_earrings.jpg',
      'black_blue_green_pink_earrings.jpg', 
      'black_blue_dice_orange_earrings.jpg',
      'black_silver_earrings_1.jpg',
      'black_gold_silver_earrings.jpg',
      'black_gold_silver_earrings_1.jpg',
      'black_earrings.jpg',
      // Additional earring images to exclude
      'silver_purple_shell_jellyfish_earrings.jpg',
      'bead_black_blue_white_earrings.jpg',
      'black_blue_white_earrings.jpg',
      'black_blue_crystal_white_earrings.jpg',
      'black_blue_white_earrings_1.jpg',
      'blue_gold_white_earrings.jpg',
      'blue_crystal_gold_white_earrings.jpg',
      'black_blue_crystal_green_white_earrings.jpg',
      'black_blue_earrings.jpg',
      'black_blue_earrings_1.jpg',
      'black_blue_earrings_2.jpg',
      'black_blue_earrings_3.jpg',
      'black_blue_silver_earrings.jpg',
      'blue_gold_purple_earrings.jpg',
      'purple_silver_earrings.jpg',
      'gold_pink_purple_silver_earrings.jpg',
      'gold_pink_white_earrings.jpg',
      'pink_white_earrings.jpg',
      'pink_silver_white_earrings.jpg',
      'blue_green_crystal_cube_earrings.jpg'
    ];

    // Filter and process data
    let diceCount = 0;
    const maxDiceImages = 3; // Limit dice images to 3
    
    const earrings = csvData.data
      .filter(row => {
        const filename = row.Filename || '';
        
        // Skip excluded specific product images
        if (excludedImages.includes(filename.toLowerCase())) {
          return false;
        }
        
        // Limit dice images
        const isDice = filename.toLowerCase().includes('dice') || 
                      (row["Theme or Motif"] || "").toLowerCase().includes("dice");
        if (isDice) {
          if (diceCount >= maxDiceImages) {
            return false;
          }
          diceCount++;
        }
        
        return true;
      })
      .map(row => {
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