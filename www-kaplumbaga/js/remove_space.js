// Remove preceding white spaces from code snippets
$("#editor").each(function(){
    var html = $(this).html();
    var pattern = html.match(/\s*\n[\t\s]*/);
    $(this).html(html.replace(new RegExp(pattern, "g"),'\n'));
});