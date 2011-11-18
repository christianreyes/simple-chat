
/*
 * GET home page.
 */

exports.index = function(req, res){
  var now = new Date();
  res.render('index', { title: 'Express', time: now});
};