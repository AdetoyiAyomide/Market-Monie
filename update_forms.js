const fs = require('fs');
const path = require('path');

const dir = 'src/(onboarding)/components/loan-form';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Hide headers
  content = content.replace(/className="text-left font-poppins"/g, 'className="hidden sm:block text-left font-poppins"');
  
  // Make labels smaller
  content = content.replace(/className="block text-sm font-medium/g, 'className="block text-xs sm:text-sm font-medium');
  content = content.replace(/text-sm text-gray-500/g, 'text-xs sm:text-sm text-gray-500');
  content = content.replace(/text-sm font-medium/g, 'text-xs sm:text-sm font-medium');

  // Make headings smaller
  content = content.replace(/<h2 className="text-2xl font-bold/g, '<h2 className="text-xl sm:text-2xl font-bold');
  content = content.replace(/<h2 className="text-3xl font-bold/g, '<h2 className="text-xl sm:text-3xl font-bold');
  content = content.replace(/<p className="mt-2 text-sm text-gray-600">/g, '<p className="mt-2 text-xs sm:text-sm text-gray-600">');
  content = content.replace(/<p className="mt-3 text-gray-600 text-\[15px\]/g, '<p className="mt-3 text-gray-600 text-xs sm:text-[15px]');

  fs.writeFileSync(filePath, content);
}
console.log('Updated forms');
