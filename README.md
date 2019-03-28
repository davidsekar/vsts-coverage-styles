# Vsts coverage styles

Converts all externally linked CSS files in an HTML document into internal styles, by loading & injecting the RAW CSS styles as text within `<style>` tags into HTML document `<head>` section. It follows the same exact CSS file linking order, while injecting back the CSS styles using `<style>` tags. So, CSS override orders are preserved and appears as expected.

This plugin was initially designed with an idea to workaround the external CSS linking restrictions in VSTS(Azure DevOps) code coverage report tab in Build Summary. But, this package can also be used in similar situations.

It focuses primarily on improving the HTML report manipulation speed by caching the repeatedly accessed external CSS files, thus allowing it to complete its inlining process as fast as it can, compared to similar packages.

You can install it as development dependency,
using `npm install vsts-coverage-styles --save-dev`

After installation, you can simply require & consume the package from your nodejs file. Also, this package allows you to hook your custom logics to pre-processing and post-processing events using `preProcessFn` & `postProcessFn` params.

The override CSS parameter allows you provide additional styles to append to your coverage reports and fix display glitches, that are caused due to stripping of pseudo selectors like :after & :before selectors, images & charsets from your CSS file by VSTS security mechanism.

```JavaScript
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

To know about the assumptions and optimization factors considered for this plugin, kindly read through the following article
[Code coverage HTML reports are missing styles in VSTS](https://davidsekar.com/aspnetcore/code-coverage-html-reports-are-missing-styles-in-vsts)
