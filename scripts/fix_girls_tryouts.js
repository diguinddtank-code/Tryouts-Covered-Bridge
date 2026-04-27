const fs = require('fs');
let code = fs.readFileSync('app/girls-tryouts/page.tsx', 'utf8');

// 1. Text clipping fix
code = code.replace(
  '<span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 transform -skew-x-6 relative py-2 -mb-2 md:-mb-4">',
  '<span className="block text-white transform -skew-x-6 relative">'
);
code = code.replace(
  '<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#CC0000] to-[#CC0000] transform -skew-x-6 relative filter drop-shadow-[0_0_15px_rgba(204,0,0,0.5)] py-2 -mt-2 md:-mt-4">',
  '<span className="block text-[#CC0000] transform -skew-x-6 relative filter drop-shadow-[0_0_15px_rgba(204,0,0,0.5)]">'
);

// 2. Schedule Grid to square side-by-side
code = code.replace(
  'grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4',
  'grid grid-cols-2 gap-3 md:gap-4'
);
// Make the cards square-like by changing paddings and flex directions
code = code.replace(
  /<div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 sm:gap-0">/g,
  '<div className="flex flex-col items-center sm:items-start justify-center gap-2 text-center sm:text-left h-full w-full">'
);
// Remove explicit hiding on br inside the address
code = code.replace(
  /<br className="hidden sm:block"\/>/g,
  '<br/>'
);
// Replace <Calendar ... /> container class
code = code.replace(
  /<div className="flex items-center gap-2 sm:mb-2">/g,
  '<div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1 sm:mb-2">'
);
// Replace Mappin ... container class
code = code.replace(
  /<div className="flex items-start gap-1\.5 md:gap-2 text-white\/90">/g,
  '<div className="flex justify-center sm:justify-start items-center sm:items-start gap-1 sm:gap-2 text-white\/90">'
);
// Add aspect-square
code = code.replace(
  /<div className="bg-gradient-to-br from-\[#050C1A\]\/95 to-black\/95 border border-\[#CC0000\]\/30 rounded-xl overflow-hidden relative group backdrop-blur-md shadow-lg p-3 md:p-5">/g,
  '<div className="bg-gradient-to-br from-[#050C1A]/95 to-black/95 border border-[#CC0000]/30 rounded-xl overflow-hidden relative group backdrop-blur-md shadow-lg p-3 md:p-5 aspect-[4/3] sm:aspect-square flex flex-col justify-center items-center sm:items-start">'
);

// 3. Leagues bigger and more prominent
// "no WE COMPETE Deixe mais destacado as ligas esta muito pequeno"
code = code.replace(
  'p className="font-dm-sans text-[11px] md:text-sm uppercase font-black text-white tracking-[0.25em] mb-5 flex items-center justify-center lg:justify-start gap-3 drop-shadow-md"',
  'p className="font-dm-sans text-xs md:text-base uppercase font-black text-white tracking-[0.25em] mb-6 flex items-center justify-center lg:justify-start gap-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"'
);
code = code.replace(
  /<div key=\{idx\} className="relative w-12 h-12 md:w-16 md:h-16/g,
  '<div key={idx} className="relative w-16 h-16 md:w-20 md:h-20'
);
code = code.replace(
  'shadow-[0_10px_30px_rgba(0,0,0,0.5)]',
  'shadow-[0_10px_40px_rgba(204,0,0,0.3)]'
);

// 4. Hero image resize and parallax
// "redimensione a imagem para ela ficar menor e assim aparecendo mais dela, com efeito paralax de fundo"
code = code.replace(
  'className="block md:hidden object-cover opacity-80 object-[50%_15%]"',
  'className="block md:hidden object-contain opacity-80 object-top scale-110 translate-y-8 lg:bg-fixed"'
);
code = code.replace(
  'className="hidden md:block object-cover opacity-50 object-center"',
  'className="hidden md:block object-cover opacity-50 object-center lg:bg-fixed"'
);

// Desktop image div wrapper parallax
code = code.replace(
  '<div className="absolute inset-0 z-0">',
  '<div className="absolute inset-0 z-0 bg-fixed">' // Doesn't quite do it for Next/Image but safe to add
);


// 5. Remove MLS Next from /girls-tryouts
// "tire a logo do MLS NEXT no /girls-tryouts"
// Make sure it's completely gone. If there is MLS NEXT in the list, remove it.
code = code.replace(
  /\{ src: "https:\/\/images\.mlssoccer\.com\/image\/upload\/v1664742553\/assets\/logos\/mls-next-2022-COLOR-800x800\.png", alt: "MLS Next" \}/g,
  ''
);
// We might end up with trailing commas or empty spots but JS mapping array is okay with it if we clean up properly.
code = code.replace(
  /,\s*\{ src: "https:\/\/images\.mlssoccer\.com\/image\/upload\/v1664742553\/assets\/logos\/mls-next-2022-COLOR-800x800\.png", alt: "MLS Next" \}/g,
  ''
);

fs.writeFileSync('app/girls-tryouts/page.tsx', code);
