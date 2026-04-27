const fs = require('fs');

let sourceCode = fs.readFileSync('app/page.tsx', 'utf8');
let targetCode = fs.readFileSync('app/girls-tryouts/page.tsx', 'utf8');

// We need to extract the below-the-fold HTML block from page.tsx:
// Everything from {/* BELOW THE FOLD */} up to </main>
let foldIndex = sourceCode.indexOf('{/* BELOW THE FOLD */}');
let mainCloseIndex = sourceCode.lastIndexOf('</main>');
let belowTheFold = sourceCode.substring(foldIndex, mainCloseIndex);

// Add missing imports to targetCode if they don't exist
const importsToAdd = `import { Target, Users, Trophy } from "lucide-react";
import { motion } from "motion/react";
import TravelSection from "@/components/TravelSection";
import ScheduleSection from "@/components/ScheduleSection";
import LeaguesSection from "@/components/LeaguesSection";`;

// Add imports
targetCode = targetCode.replace('import { useLanguage } from "@/context/LanguageContext";', 
`import { useLanguage } from "@/context/LanguageContext";
${importsToAdd}`);

// We want to insert the belowTheFold sections inside girls-tryouts/page.tsx
// Before the footer, let's find the footer
let targetFooterIndex = targetCode.indexOf('{/* Footer */}');

// Let's create the final new content to insert
let newSections = belowTheFold.replace('<ScheduleSection />', '').replace('<TravelSection />', '').replace('<LeaguesSection />', ''); // Assuming we only want the hardcoded stats, bento grid, testimonials, FAQ, or maybe we want them all?

// User said "adicione umas sections abaixo igual tem nas outras pages, para gerar mais autoridade"
// Let's keep TravelSection and LeaguesSection out for now unless requested, or put them in? We'll put them in because why not - they build authority. Wait, LeaguesSection has MLS NEXT hardcoded. I will omit LeaguesSection, maybe uncomment ScheduleSection or just leave Stats, Bento, Testimonials, FAQ. 
// Actually, let's leave Stats, Bento, Testimonials, FAQ in.

newSections = newSections.replace('<ScheduleSection />', '')
                         .replace('<TravelSection />', '')
                         .replace('<LeaguesSection />', '');

// Insert just before footer
targetCode = targetCode.substring(0, targetFooterIndex) + newSections + targetCode.substring(targetFooterIndex);

fs.writeFileSync('app/girls-tryouts/page.tsx', targetCode);
