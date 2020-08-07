$(function () {
    barba.hooks.enter((data) => { // <- add data argument here
      window.scrollTo(0, 0);
      
      var $newPageHead = $('<head />').html(
        $.parseHTML(
          data.next.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0], // <- use data argument
          document,
          true
        )
        );


barba.init({
    transitions: [{
        name: 'default-fade',
        leave() {
            anime({
                targets: 'nav',
                opacity: 0
              });
        },
        enter() {
            anime({
                targets: 'nav',
                opacity: 1
              });
        }
    }]
});
