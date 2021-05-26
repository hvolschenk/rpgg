const htmlLoader = (url, callback) => {
  fetch(url)
    .then((stream) => { return stream.text(); })
    .then((text) => {
      return new DOMParser()
        .parseFromString(text, 'text/html')
        .querySelector('template');
    })
    .then((template) => {
      callback(template);
    })
    .catch((error) => {
      throw new Error(`Failed to load html from ${url}`);
    });
};

export default htmlLoader;
