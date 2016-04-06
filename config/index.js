var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds015710.mlab.com:15710/munchkin-online';
    }
}