# Vsts coverage styles

This package helps to convert the external css files linked in an HTML into an internal style i.e., by injecting in HTML using `<style>` tag in the document head.
It follows the same order while injecting CSS back in the HTML.

It doesn't do anything else, so it is as simple and fast as it can.

install using `npm install vsts-coverage-styles --save `

Following is how you can consume the package from the nodejs file.

The override css allows you to fix the glitches due to VSTS stripping pseudo selectors like :after & :before selectors, images & charsets

```
/**
 * Vsts test coverage view doesn't load external CSS due to security reasons.
 * So we are converting all external css files to internal <style> tags using vsts-coverage-styles (node module).
 * Fix all UI issues due to VSTS stripping :after & :before selectors, images & charsets
 */
const vstsCoverageStyles = require('vsts-coverage-styles').VstsCoverageStyles;
const overrideCss = '.status-line { clear:both;} ' +
    '.coverage .line-count, .coverage .line-coverage, ' +
    '.coverage .text .prettyprint {font-size:12px !important; ' +
    'line-height:1.2 !important;font-family:Consolas, "Liberation Mono", Menlo, Courier, monospace !important;}' +
    '.coverage .line-count{max-width:40px;padding-right:25px !important;} ' +
    '.coverage .line-coverage{max-width:45px;}' +
    '.coverage .line-coverage .cline-any{padding-right:25px !important;}' +
    '.coverage-summary{font-size:small;}';

// Default Options
vstsCoverageStyles({
    coverageDir: './coverage',
    pattern: '/**/*.html',
    fileEncoding: 'utf8',
    minifyOptions: {

    },
    extraCss: overrideCss,
    preProcessFn: function (html) {
        return html.replace(new RegExp('×', 'g'), 'x');
    },
    postProcessFn: function(html) {
        return html;
    }
});
```

To know about the assumptions and the optimization done for this plugin, check out the following article
[Code coverage HTML reports are missing styles in VSTS](https://davidsekar.com/aspnetcore/code-coverage-html-reports-are-missing-styles-in-vsts)
