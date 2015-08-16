exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['app/**/*Spec.js'],
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }]
};
