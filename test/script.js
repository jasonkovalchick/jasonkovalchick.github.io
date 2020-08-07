barba.init({
    transitions: [{
      name: 'default-transition',
      leave() {
        anime({
            targets: '.square',
            delay: 250,
            translateX: 50
        })
      },
      enter() {
        anime({
            targets: '.square',
            delay: 250,
        })
      }
    }]
  });