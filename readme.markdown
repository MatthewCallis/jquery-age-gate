# jQuery Age Gate Plugin

Simple age verification, 'age gate', plugin required by some content providers for mature content. Supports cookies when used with [jquery-cookie](https://github.com/carhartl/jquery-cookie). Original code concept from [CatsWhoCode.com](http://www.catswhocode.com/blog/10-jquery-snippets-for-efficient-developers).

## Useage

```javascript
$('#age-restricted').agegate({
  age: 21,
  legal: function(){
    $('#age-restricted').empty().append('<iframe src="..."></iframe>');
  },
  underage: function(){
    alert("Sorry, you must be at least " + this.age + " years old in order to continue.");
    $('#age-restricted').empty();
  }
});
```

## License
Released under the [GPLv2 license](http://www.gnu.org/licenses/gpl-2.0.html).
