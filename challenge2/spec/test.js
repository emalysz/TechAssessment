var selenium = require('selenium-webdriver'),
    AxeBuilder = require('axe-webdriverjs'),
    Key = selenium.Key;
    assert = require('assert');

var util = require('util');

var driver;

const VIOLATIONS_THRESHOLD = 0;

describe('Deque Mars Application', function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    beforeEach(function(done) {
        driver = new selenium.Builder()
            .forBrowser('chrome')
            .build();

        driver.get('https://dequeuniversity.com/demo/mars')
            .then(function () {
                done();
            });
    });

    // Close website after each test is run (so it is opened fresh each time)
    afterEach(function(done) {
        driver.quit().then(function () {
            done();
        });
    });

    it('main nav bar should be displayed', function() {
      driver.findElement(selenium.By.css("#main-nav"))
        .then(async function (element) {
            assert(await element.isDisplayed(), 'Element is displayed.');
        })
    });

    it('should complete an accessibility scan of the page - basic', async function (done) {
       AxeBuilder(driver)
            .analyze(function(results) {
                console.log('Number of Accessibility violations', results.violations.length);
                console.log('Accessibility violations: ', results);

                // Expect 0 violations
                expect(results.violations.length).toBe(VIOLATIONS_THRESHOLD);

                done();
            })
    });

    it('should complete an accessibility scan of the page - find critical errors', async function (done) {
       AxeBuilder(driver).withTags('wcag2a')
            .analyze(function(results) {
                console.log('Accessibility violations with limited tags: ', results.violations.length);
                  const criticalViolations = results.violations.filter(violation => {
                    return violation.impact === 'critical';
                  });
                  console.log('Critical Violations:', criticalViolations);
                
                expect(results.violations.length).toBe(VIOLATIONS_THRESHOLD);

                done();
            })
    });

    it('should complete an accessibility scan of the page - wcag2a limited', async function (done) {
       AxeBuilder(driver).withTags('wcag2a')
            .analyze(function(results) {
                console.log('Accessibility violations with limited tags: ', results.violations.length);

                // Expect violations to be less than the driver with additional tags
                // Can hardcode this value as threshold or can retrieve via variable from previous test
                expect(results.violations.length).toBeLessThanOrEqual(11);

                done();
            })
    });
});