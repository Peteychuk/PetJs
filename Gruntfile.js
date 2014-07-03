module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '\
\n\
/**\
*\
* petjs - router of ajax applications, HTML5 history API expansion for browsers who not supporting it\n\
*\n\
* @author     Yaroslav Peteychuk <http://www.peteychuk.com/>, <peteychuk@gmail.com>\n\
* @homepage   https://github.com/peteychuk/petjs\n\
* @copyright  2012-2014 by Peteychuk\n\
* @version    0.1.3\n\
* @update     03-07-2014\n\
* @includes   HistoryAPI 4.0.2 (c) 2011-2013 by Dmitrii Pakhtinov\n\
*\n\
* Dual licensed under the MIT and GPL licenses:\n\
* http://www.opensource.org/licenses/mit-license.php\n\
* http://www.gnu.org/licenses/gpl.html\n\
*\n\
*/\n\n'
            },
            all: {
                files: {
                    'pet.min.js': ['pet.js']
                }
            }
        }
    });

    // Load
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default action
    grunt.registerTask('default', ['uglify']);

};