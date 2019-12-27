const watch = require('node-watch');
const { exec } = require('child_process');

watch('src', {}, function() {
    exec('npm run build');
});
