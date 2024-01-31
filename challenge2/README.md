# Challenge 1

## Description

This is a NodeJS Selenium test file that contains four tests:
- 1: Visits the demo site and asserts visibility of the element
- 2: Performs basic accessibility scan and asserts count
- 3: Performs accessibility scan and filters by critical issues
- 4: Performs accessibility scan with additional tags

## How to Run

- `npm i`
- `npm run test`


## Technical Challenges

### this.driver.switchTo is not a function
When evaluating a WDIO integration, I found running the axe builder via:
	`const results = await new AxeBuilder(driver).analyze();`
returns the following error from the axe package:
```
[chrome 120.0.6099.234 mac #0-0] this.driver.switchTo is not a function
[chrome 120.0.6099.234 mac #0-0] TypeError: this.driver.switchTo is not a function
[chrome 120.0.6099.234 mac #0-0]     at AxeBuilder.analyzePromise (file:///Users/emmamalysz/Desktop/Deque/node_modules/@axe-core/webdriverjs/dist/index.mjs:391:23)
[chrome 120.0.6099.234 mac #0-0]     at file:///Users/emmamalysz/Desktop/Deque/node_modules/@axe-core/webdriverjs/dist/index.mjs:363:19
[chrome 120.0.6099.234 mac #0-0]     at new Promise (<anonymous>)
[chrome 120.0.6099.234 mac #0-0]     at AxeBuilder.analyze (file:///Users/emmamalysz/Desktop/Deque/node_modules/@axe-core/webdriverjs/dist/index.mjs:362:12)
[chrome 120.0.6099.234 mac #0-0]     at Context.<anonymous> (file:///Users/emmamalysz/Desktop/Deque/test/specs/test.e2e.js:16:51)
```
I found a separate package that helped with the WDIO integration - https://www.npmjs.com/package/@axe-core/webdriverio , but given the prompt specifies the webdriverjs package.


## Roadmap for Continued Development

- Increase browser coverage beyond chrome
- Interact more with accessibility scan

## Resources

- https://www.deque.com/blog/accessibility-testing-axe-webdriverjs/
- https://github.com/marcysutton/axe-webdriverjs-demo
