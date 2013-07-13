#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

// (AJS): Comments and extensions for HW3_Part_3 on July 7, 2013
// a.sanchez.824@gmail.com

// (AJS): required initializations ...
//
var fs = require('fs');
var rest = require('restler'); //(AJS)
var program = require('commander'); // (AJS): use to process command-line input
var cheerio = require('cheerio'); // (AJS): use to read and process html file
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var JASON_OUTPUT_CHECK_FILE = "HW3_Part3_output_file.json"; //(AJS)
var JASON_OUTPUT_CHECK_URL = "HW3_Part3_output_URL.json"; //(AJS)
URL_DEFAULT = "http://protected-thicket-8707.herokuapp.com/"; //(AJS)
TEMP_HTML_FILE = "HW3_Part3_TEMP.html"; //(AJS)

// (AJS): In the function definition below
// infile should be really named infile_name ...
// (or something of the sort ...)
var assertFileExists = function(infile) {
    var instr = infile.toString();
    console.log("***In assertFileExists, infile: " + infile);
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    
    // If there is a file bound to infile name
    // return its name ...
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

// (AJS): This version directly uses the file
// returned by the GET call using restler
// instead of trying to open a file from a filename.
// This is more efficient than creating a temporary
// file and calling checkHtmlFile
var checkURLFile = function(actual_htmlfile, checksfile) {
    // (AJS): there is nothing special about using "$" as
    // a variable name--albeit a crappy name in most cases ...
    // See the discussion here ...
    // http://stackoverflow.com/questions/846585/can-someone-explain-the-dollar-sign-in-javascript

    // $ = cheerioHtmlFile(htmlfile);
    //
    // (AJS): Substitute the above to avoid hoping back and
    // forth in order to understand what this
    // function does ...
    //
    // cheerio.load gets call on what fs.readFileSync(htmlfile)
    // returns.
    //
    // References:
    //
    // - fs.readFileSync(htmlfile): 
    //
    // - cheerio.load(fs.readFileSync(htmlfile)):
    //
    //$ = cheerio.load(fs.readFileSync(htmlfile));
    $ = cheerio.load(actual_htmlfile);

    // var checks = loadChecks(checksfile).sort();
    //
    // (AJS):Substitute the above to avoid hoping back and
    // forth in order to understand what this
    // function does.
    //
    // JSON.parse is called on what fs.readFileSync(checksfile)
    // returns.
    //
    // References:
    //
    // - fs.readFileSync(checksfile)
    //
    // - JSON.parse(fs.readFileSync(checksfile))
    //
    // - (JSON.parse(fs.readFileSync(checksfile))).sort()

    var checks = (JSON.parse(fs.readFileSync(checksfile))).sort();

    // (AJS):
    // (1) Initializes the out dictionary (collection of (key,value)
    // pairs) as empty
    // Note: out seems to be a dictionary holding (key, value)
    // (2) Iterates on the contents of checks, and ii takes
    // indices values between 0 and the length-1 of checks
    // (3) variable present will be true iff checks[ii] is
    // in the html file; false otherwise
    // (4) The value of present is associated key checks[ii]
    // in out
    var out = {}; //(1)
    for(var ii in checks) { //(2)
        var present = $(checks[ii]).length > 0; //(3)
        out[checks[ii]] = present; //(4)
    }
    // (AJS): out is a collection of (key,value) pairs
    // where key takes the values in checks, and value
    // takes true or false values
    return out;
};

var checkHtmlFile = function(htmlfile, checksfile) {
    // (AJS): there is nothing special about using "$" as
    // a variable name--albeit a crappy name in most cases ...
    // See the discussion here ...
    // http://stackoverflow.com/questions/846585/can-someone-explain-the-dollar-sign-in-javascript

    // $ = cheerioHtmlFile(htmlfile);
    //
    // (AJS): Substitute the above to avoid hoping back and
    // forth in order to understand what this
    // function does ...
    //
    // cheerio.load gets call on what fs.readFileSync(htmlfile)
    // returns.
    //
    // References:
    //
    // - fs.readFileSync(htmlfile): 
    //
    // - cheerio.load(fs.readFileSync(htmlfile)):
    //
    $ = cheerio.load(fs.readFileSync(htmlfile));

    // var checks = loadChecks(checksfile).sort();
    //
    // (AJS):Substitute the above to avoid hoping back and
    // forth in order to understand what this
    // function does.
    //
    // JSON.parse is called on what fs.readFileSync(checksfile)
    // returns.
    //
    // References:
    //
    // - fs.readFileSync(checksfile)
    //
    // - JSON.parse(fs.readFileSync(checksfile))
    //
    // - (JSON.parse(fs.readFileSync(checksfile))).sort()

    var checks = (JSON.parse(fs.readFileSync(checksfile))).sort();

    // (AJS):
    // (1) Initializes the out dictionary (collection of (key,value)
    // pairs) as empty
    // Note: out seems to be a dictionary holding (key, value)
    // (2) Iterates on the contents of checks, and ii takes
    // indices values between 0 and the length-1 of checks
    // (3) variable present will be true iff checks[ii] is
    // in the html file; false otherwise
    // (4) The value of present is associated key checks[ii]
    // in out
    var out = {}; //(1)
    for(var ii in checks) { //(2)
        var present = $(checks[ii]).length > 0; //(3)
        out[checks[ii]] = present; //(4)
    }
    // (AJS): out is a collection of (key,value) pairs
    // where key takes the values in checks, and value
    // takes true or false values
    return out;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

var assertURLExists = function(URLString) {
    // I assume the URLString is actually
    // associated with a live URL that can
    // be visited, since the call to it
    // through restler will actually check
    // this ...
    return URLString;
};


var buildfn = function() {
    var process_result = function(result, response) {
        if (result instanceof Error) {

            console.error('Error: ' + util.format(response.message));
            process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code 

        } 
        else 
        {
                console.log("+++process_result called!!!");

                // This needs to be done here, because the call is
                // assynchronous!! This is the typical event-driven
                // behavior ...
 
                var checkJson2 = checkURLFile(result, program.checks);
                var outJson2 = JSON.stringify(checkJson2, null, 4);
                console.log("*** Result from checking URL:\n" + outJson2);
                fs.writeFileSync(JASON_OUTPUT_CHECK_URL, outJson);
                console.log(JASON_OUTPUT_CHECK_URL + " created ...");
        }  
    };
    return process_result;
};

if(require.main == module) 

{ // Call through command line ...

    /* (AJS): this portion of code does the following:
     * 
     * (1) When the call is via the command line:
     *
     *      (a) defines the options as follows:
     *          (i)  -c or --checks followed by the name to a JSON file.
     *               When this option is not present, or when the file
     *               does not exist, it uses the default file, which is
     *               called checks.json, and it is supposed to be in
     *               the same directory the function is executed from.
                     The first argument is bound to variable "checks".
     *          (ii) -f or --file followed by the name to an html file.
     *               When this option is not present, or when the file
     *               does not exist, it uses the default file, which is
     *               called index.html, and it is supposed to be in
     *               the same directory the function is executed from.
     *               The second argument is bound to to variable "file"
     *
     *     (b)  takes the arguments to the function from the command line
     */

     // (AJS): Note ... program is a commander object ...
     // I need to understand what the parameters to .option mean ...
    program
        .option('-c, --checks <check_file>', 'Path to checks.json', 
                clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-f, --file <html_file>', 'Path to index.html', 
                clone(assertFileExists), HTMLFILE_DEFAULT)
        .option('-u, --url <URL>', 'URL', 
                clone(assertURLExists), URL_DEFAULT)
        .parse(process.argv);

    //(AJS):DEBUG
    //console.log("*** Command line arguments: " + process.argv);
    console.log("*** program.file: " + program.file + "// program.checks: " 
                                     + program.checks + "// program.url: " + program.url);
    console.log("NEXT ...");
    //(AJS):GUBED

    // (AJS) At this point:
    // 
    // - check file exists and its name is program.checks
    // - If file was provided, it exists and its name is program.file
    // - If url was provided, its name is program.url
    //
    // The expected behavior is:
    //
    // (1) If file was provided and url was not provided, check file
    //
    // (2) If url was provided and file was not provided, check url
    //
    // (3) If both file and url are provided, then show an
    // error message and exit
    //
    // (4) If both file and url are the default values, use
    // the file default value (Not the url default value)
    //
    // For this logic to work, it is assummed that 
    //
    // (a) when a file is provided, program.file != HTMLFILE_DEFAULT
    //
    // (b) when an url is provided, program.url != URL_DEFAULT

    // Case 1: If file was provided and url was not provided, check file
    //
    if (program.url == URL_DEFAULT && program.file != HTMLFILE_DEFAULT) {

        // Check file
        console.log("file was provided and url was not provided ... check file");

        /* (AJS): call to function checkHtmlFile with two arguments:
         * 
         * - program.file: file to be checked
         * - program.checks: JSON file describing what needs to be checked
         *
         * The function returns: a dictionary of (key,value) pairs
         */
         var checkJson = checkHtmlFile(program.file, program.checks);

        /* (AJS): "JSON.stringify converts an object to JSON notation representing it."
         * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
         */
        //var outJson = JSON.stringify(checkJson, null, 15);
        // The second argument--"space"--acts as "beautification" ... in
        // this case is the number of spaces use to show indentation
        // when showing the string representation of the JSON object.
        // The first argument--"replacer"--is explained in the reference above
        // and clearly not used here ("null").
        var outJson = JSON.stringify(checkJson, null, 4);

        // (AJS): prints out the JSON value returned above
        console.log("*** Result from checking file:\n" + outJson);

        // (AJS): maybe it is better to produce a file as well?
        // yes ... here it is ...
        fs.writeFileSync(JASON_OUTPUT_CHECK_FILE, outJson);
        console.log(JASON_OUTPUT_CHECK_FILE + " created ...");

        process.exit(0);

    }
    // End Case 1

    // Case 2: If url was provided and file was not provided, check url
    //
    if (program.url != URL_DEFAULT && program.file == HTMLFILE_DEFAULT) {

        // Check url
        console.log("url was provided and file was not provided ... check url");

        // (AJS):
        // Note: I am mimicking the way market-research created
        // the callback function. However, in this case, there
        // is no need for the function to be a continuation
        // A regular f(response, result) would have sufficed ...
        var process_result = buildfn();
        rest.get(program.url).on('complete', process_result);

        // Note: if one does not pay attention, one might
        // forget that the call above is assynchronous
        // so the whole processing should happen in 
        // process-result ...

        // cannot do ...
        // process.exit(0);

        // exit from above ... remember the assynchronism ...

        // We leave control to fall through ...
        //

    }
    // End Case 2

    // Case (3): If both file and url are provided, then show an
    // an error message and exit
    //
    if (program.file != HTMLFILE_DEFAULT && program.url != URL_DEFAULT) {

        // Error!
        console.log("grader: Error! I can only check a file OR an URL, not both ... Exiting ...");
        process.exit(1);

    }
    // End Case 3

    // Case (4): If both file and url are the default values, use
    // the file default value (Not the url default value)
    //
    if (program.file == HTMLFILE_DEFAULT && program.url == URL_DEFAULT) {

        // Check default file ...
        console.log("url is default AND file is default ... check file");

        /* (AJS): call to function checkHtmlFile with two arguments:
         * 
         * - program.file: file to be checked
         * - program.checks: JSON file describing what needs to be checked
         *
         * The function returns: a dictionary of (key,value) pairs
         */
         var checkJson = checkHtmlFile(program.file, program.checks);

        /* (AJS): "JSON.stringify converts an object to JSON notation representing it."
         * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
         */
        //var outJson = JSON.stringify(checkJson, null, 15);
        // The second argument--"space"--acts as "beautification" ... in
        // this case is the number of spaces use to show indentation
        // when showing the string representation of the JSON object.
        // The first argument--"replacer"--is explained in the reference above
        // and clearly not used here ("null").
        var outJson = JSON.stringify(checkJson, null, 4);

        // (AJS): prints out the JSON value returned above
        console.log("*** Result from checking file:\n" + outJson);

        // (AJS): maybe it is better to produce a file as well?
        // yes ... here it is ...
        fs.writeFileSync(JASON_OUTPUT_CHECK_FILE, outJson);
        console.log(JASON_OUTPUT_CHECK_FILE + " created ...");

        process.exit(0);

    }
    // End Case 4

    // NO-MAN LAND ... control should not reach this point!!
    // console.log("grader: Internal Error! Control reached NO-MAN land ... Exiting ...");
    // process.exit(1);

}// End of call through command line ... 
    
else 

{// Call as a module ...

    exports.checkHtmlFile = checkHtmlFile;

}// End of call as a module