var rellax = new Rellax('.rellax');
var anime = new Anime('.animejs');

barba.init({
    transitions: [{
        name: 'default-fade',
        leave() {
            anime({
                targets: '.menu',
                translateX: 250
              });
        },
        enter() {
            anime({
                targets: '.menu',
                translateX: 0
              });
        }
    }]
});

anime({
    targets: 'div',
    translateX: 250,
    rotate: '1turn',
    backgroundColor: '#FFF',
    duration: 800
  });