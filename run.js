const vstsCoverageStyles = require('./index').VstsCoverageStyles;

vstsCoverageStyles({
    coverageDir: './test',
    extraCss: '.test{color:red;}',
    preProcessFn: function (html) {
        return html.replace(new RegExp('×', 'g'), 'x');
    },
    postProcessFn: function (html) {
        return html.replace(new RegExp('&#xD7;', 'g'), 'x');
    }
});
