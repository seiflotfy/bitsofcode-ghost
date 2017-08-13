var smartZip = require("smart-zip");
 
var regexExcludes = ['node_modules', 'gulpfile.js', 'zip.js', 'yarn.lock'];
 
smartZip.zip('./', 'bitsofcode-ghost.zip', false, regexExcludes, function (error) {
    if (error) {
        throw error;
    }
    console.log('Completed.');
});