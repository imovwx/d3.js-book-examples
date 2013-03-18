
window.helpers = {
    uniques: function (data, nick) {
        var uniques = [];
        
        data.forEach(function (d) {
            if (uniques.indexOf(nick(d)) < 0) {
                uniques.push(nick(d));
            }
        });

        return uniques;
    }, 

    bin_per_nick: function (data, nick) {
        var uniques = helpers.uniques(data, nick);
        
        var nick_id = d3.scale.ordinal().domain(uniques).range(d3.range(uniques.length));
        
        var histogram = d3.layout.histogram()
                .bins(nick_id.range())
                .value(function (d) { return nick_id(nick(d)); })(data);
        
        return histogram;
    },

    tickAngle: function (d) {
        var midAngle = (d.endAngle-d.startAngle)/2,
            degrees = (midAngle+d.startAngle)/Math.PI*180-90;

        return degrees;
    },

    color:  d3.scale.ordinal()
        .range(['#EF3B39', '#FFCD05', '#69C9CA', '#666699', '#CC3366', '#0099CC', 
                '#CCCB31', '#009966', '#C1272D', '#F79420', '#445CA9', '#999999', 
                '#402312', '#272361', '#A67C52', '#016735', '#F1AAAF', '#FBF5A2', 
                '#A0E6DA', '#C9A8E2', '#F190AC', '#7BD2EA', '#DBD6B6', '#6FE4D0']),

    arc_labels: function (selection, text, radius) {
        return selection.append('text')
            .text(text)
            .attr('text-anchor', function (d) {
                return helpers.tickAngle(d) > 100 ? 'end' : 'start';
            })
            .attr('transform', function (d) {
                var degrees = helpers.tickAngle(d);
                
                var turn = 'rotate('+degrees+') translate('+(radius(d)+10)+', 0)';
                
                if (degrees > 100) {
                    turn += 'rotate(180)';
                }
                
                return turn;
            });
    }
};
