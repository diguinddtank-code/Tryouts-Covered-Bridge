const fs = require('fs');
let code = fs.readFileSync('app/girls-tryouts/page.tsx', 'utf8');

// Replace #FF1493 with #CC0000
code = code.replace(/#FF1493/g, '#CC0000');

// Replace pink-600 with red-600
code = code.replace(/pink-600/g, 'red-600');

// Fix mobile image overlay visibility
// The overlay has: via-[#050C1A]/80 md:via-[#050C1A]/90 to-[#CC0000]/20
// Let's make mobile slightly less opaque so the image pops.
// "md:bg-gradient-to-r from-[#050C1A] via-[#050C1A]/80 md:via-[#050C1A]/90" -> "md:bg-gradient-to-r from-[#050C1A]/90 via-[#050C1A]/60 md:via-[#050C1A]/90"
// Wait, the line is:
// "absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#050C1A] via-[#050C1A]/80 md:via-[#050C1A]/90 to-[#CC0000]/20 mix-blend-multiply z-10"
// Let's change the overlay for mobile. 
code = code.replace(
  'bg-gradient-to-b md:bg-gradient-to-r from-[#050C1A] via-[#050C1A]/80 md:via-[#050C1A]/90 to-[#CC0000]/20 mix-blend-multiply', 
  'bg-gradient-to-b md:bg-gradient-to-r from-[#050C1A]/60 via-[#050C1A]/60 md:via-[#050C1A]/90 to-[#CC0000]/20 mix-blend-multiply'
);

// Second overlay
code = code.replace(
  'bg-gradient-to-t from-[#050C1A] via-[#050C1A]/50 to-transparent z-10',
  'bg-gradient-to-t from-[#050C1A] via-[#050C1A]/30 to-transparent z-10'
);

fs.writeFileSync('app/girls-tryouts/page.tsx', code);
