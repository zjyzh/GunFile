// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'Upload not suessess if do not upload file test': browser => {
    browser
      .init()
      .waitForElementVisible('#app',1000)
      .assert.elementPresent('#sure-file')
      .click('button')
      .assert.elementNotPresent('.previewItem')
      .end();
  },
};
