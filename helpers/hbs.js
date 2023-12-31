const moment = require('moment')

//handlebars helper function
module.exports = {
    formatDate: function (date, format) {
        return moment(date).utc().format(format)
    },

    // truncates text
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    stripTags: function (input) {
        //  this regular expression scans the input string for any HTML tags and replaces them with an empty string, effectively stripping all HTML tags from the input string. 
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    // check if user wrote the story and return link to specific story (with floating icon) for edit
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    },
    // select helper function takes in a selected value and a block of Handlebars template code (options). It processes the options block, marks the <option> element with a value matching the selected value as "selected," and returns the modified HTML string for rendering a <select> element with the appropriate option pre-selected. 
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    },
}
