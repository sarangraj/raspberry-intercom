var db = require('../database');
module.exports = {
  show: function(req, res, next){
   var sql='SELECT * from admin';
   var data = '';
   db.exec(sql, data, function(err, results) {
			if (err) { 
        // If unexpected error then send 500
			} else {
                var json_result = JSON.stringify(results);
                res.render('about', { title: 'About', results: results });
            }
   });
},

}
