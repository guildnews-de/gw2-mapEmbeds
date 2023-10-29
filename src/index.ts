const init = () => {
  const scripts = document.querySelector('script#gw2maps');
  if (scripts == null) {
    import('./App')
      .then(({ default: App }) => App())
      .catch((err) => {
        console.error(err);
      });
  }
};

export default (function setGW2Embed() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
    });
  } else {
    setTimeout(init, 1);
  }
})();
