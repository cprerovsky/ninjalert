module.exports = function (ninja, settings) {

	return {
		index: function(req, res) {
			ninja.device(settings.guids.state).fetch(function(err, ddata) {
				var data = {
					state: ddata,
					armed: ddata.last_data.DA === 'Armed'
				};
				res.render('index', data);
			});
		},

		status: function(req, res) {
			res.send({ armed: true });
		},

		arm: function(req, res) {
			ninja.device(settings.guids.state).actuate('Armed', function (err) {
				res.redirect('/');
			});
		},

		unarm: function(req, res) {
			ninja.device(settings.guids.state).actuate('Unarmed', function (err) {
				res.redirect('/');
			});
		}
	};
};