# Challenge 1

## Description

This is a web application that searches through the Google Books API according to the prompt instructions.

## How to Run

Spin up a webserver (such as `python3 -m http.server`) and load `localhost:8000` or load index.html directly in a web browser.

## Design/Technical Decisions

- For rendering performance, I stored the pagination results and dynamically add the elements depending on the index of the array. This ensures we only populate the DOM when necessary
- Similarly, I added an onClick listener to the book items to dynamically add the description when prompted by the user.
- Descriptions can expand/hide
- Colors were found from the Accessible Color Palette Generator
- I defined the server response time to include the json method given the documentation references this as completion.
- Ensured the axe-core extension returned 0 issues in the scanner
- Added aria labels to buttons, inputs, and interactive elements

## Roadmap for Continued Development

Increase functionality and improve design of the web app including:
- Showing which page button is currently selected via background color or outline
- Combine logic for formatStats and formatNoResults to eliminate duplicate logic
- Include image of book thumbnail with alt text
- Add tab ordering to descriptions for books
- Improve array treversal performance

## Resources

- https://www.tutorialspoint.com/building-frequency-map-of-all-the-elements-in-an-array-javascript
- https://stackoverflow.com/questions/56763284/create-frequency-map-using-map-javascript
- https://developers.google.com/books
- https://developer.mozilla.org/en-US/docs/Web/API/Response/json
- https://venngage.com/tools/accessible-color-palette-generator
