const vstsCoverageStyles = require('./index').VstsCoverageStyles;

vstsCoverageStyles({
    coverageDir: './test',
    extraCss: '.test{color:red;}'
});
