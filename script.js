const swup = new Swup({
  plugins: [new SwupHeadPlugin()]
});

const options = {
    linkSelector:
      'a[href^="' +
      window.location.origin +
      '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])'
  };

