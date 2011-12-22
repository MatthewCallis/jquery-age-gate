/**
 * jQuery Age Gate v1.0.0
 *
 * Simple age verification, "age gate", plugin required by some content providers.
 * Supports Cookies when used with https://github.com/carhartl/jquery-cookie
 * https://github.com/hark/jquery-age-gate
 *
 * by Matthew Callis https://github.com/MatthewCallis
 *                   http://www.hark.com
 *
 * Useage:
 *   $('#age-restricted').agegate({
 *     age: 21,
 *     legal: function(){
 *       $('#age-restricted').empty().append('<iframe src="..."></iframe>');
 *     },
 *     underage: function(){
 *       alert("Sorry, you must be at least " + this.age + " years old in order to continue.");
 *       $('#age-restricted').empty();
 *     }
 *   });
 *
 * Released under the GPLv2 license, http://www.gnu.org/licenses/gpl-2.0.html
 */
(function($){
  $.fn.agegate = function(options){
    var cookie_js = (typeof $.cookie !== "undefined");
    return this.each(function(){
      var o = $.extend({}, $.fn.agegate.defaults, options);

      // If the age_gate cookie is set, use it.
      if(cookie_js && $.cookie('age_gate') !== null){
        if($.cookie('age_gate') === 'underage'){
          o.underage();
          return;
        }
        else if($.cookie('age_gate') === 'legal'){
          o.legal();
          return;
        }
        else{
          // Invalid Cookie, delete it.
          $.cookie('age_gate', null);
        }
      }

      // Build the container and inputs
      var gate = $('<div/>').attr({ 'id': o.container_id });
      var title = $('<strong/>').text(o.title);
      var day = $('<select/>').attr({ 'id': 'agegate-day', 'name': 'agegate-day' }).append(function(){
        var days = '';
        for(var i = 1; i < 32; i++){
          days += '<option value="'+i+'">'+i+'</option>';
        }
        return days;
      });

      var month = $('<select/>').attr({ 'id': 'agegate-month', 'name': 'agegate-month' }).append(function(){
        var months = '';
        for(var i = 0; i < 12; i++){
          months += '<option value="'+i+'">' + o.month_names[i] + '</option>';
        }
        return months;
      });

      var year = $('<select/>').attr({ 'id': 'agegate-year', 'name': 'agegate-year' }).append(function(){
        var years = '';
        for(var i = 2011; i > 1900; i--){
          years += '<option value="'+i+'">' + i + '</option>';
        }
        return years;
      });

      var verify = $('<input/>').attr({ 'type': 'submit', 'id': 'verify', 'name': 'verify', 'value': o.verify_text, 'class': o.verify_class });
      verify.bind('click', function(){
        var birthday = new Date();
        birthday.setFullYear($('#agegate-year').val(), $('#agegate-month').val(), $('#agegate-day').val());
        var today = new Date();
        today.setFullYear(today.getFullYear() - o.age);
        if((today - birthday) < 0){
          o.underage();
          if(cookie_js){
            $.cookie('age_gate', 'underage');
          }
        }
        else{
          o.legal();
          if(cookie_js){
            $.cookie('age_gate', 'legal');
          }
        }
      });

      var b = '<br/>';
      gate.append(title)
          .append(b+b)
          .append(o.label_request)
          .append(b+b)
          .append(o.label_day)
          .append(day)
          .append(o.label_month)
          .append(month)
          .append(o.label_year)
          .append(year)
          .append(b)
          .append(verify);

      $(this).empty().append(gate);
    });
  };

  $.fn.agegate.defaults = {
    age:            18,
    container_id:  'age-gate',
    verify_text:   'Verify',
    verify_class:  'submit',
    title:         'Age-Restricted',
    label_day:     'Day:',
    label_month:   'Month:',
    label_year:    'Year:',
    label_request: 'Please Enter Your Birthday:',
    month_names:   ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    legal: function(){},
    underage: function(){}
  };
})(jQuery);
