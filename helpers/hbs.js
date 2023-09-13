const moment = require('moment')

//handlebars helper function
module.exports = {
    formatDate: function(date, format){
        return moment(date).utc().format(format)
    },
    
}
