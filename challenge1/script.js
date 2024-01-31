// Global variable that will be ovewritten with each API request
let RESPONSE_TIME;

// Execute the API request to fetch information from Google Books API
function searchBooks() {
  const searchInput = document.getElementById('searchInput').value;

  // Google Books API returns a max of 40 results
  const maxResults = 40;

  const startTime = performance.now();
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}&maxResults=${maxResults}`)
    .then(response => response.json())
    .then(data => {
      // Calculate server response time
      const endTime = performance.now();
      RESPONSE_TIME = endTime - startTime;

      if (data.items) {
        formatPagination(data.items)
        formatResults(data.items, 0);
        formatStats(data.items);
      } else {
        formatNoResults();
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Formats the data returned by the API request
function formatResults(results, paginationIndex) {
  if (!results || results.length === 0) {
    formatNoResults()
    return;
  }

  let bookList = document.getElementById("bookList");
  // Clear HTML before formatting
  bookList.innerHTML = '';

  // Paginate in groups of 10
  for (let i = 0; i < 10; i++) {
    let resultIndex = (paginationIndex*10) + i;
    let result = results[resultIndex];

    let bookItem = document.createElement("li");

    let bookSpan = document.createElement("span");
    bookSpan.className = "book-span"
    
    let formattedAuthorString = "";
    if (result.volumeInfo.authors && result.volumeInfo.authors.length > 0) {

      // Iterate through author array to format results according to prompt
      result.volumeInfo.authors.forEach((author, index) => {
        formattedAuthorString += index === 0 ? author : ' [, ' + author;
      });

      for (let i = 0; i < result.volumeInfo.authors.length-1; i++) {
        formattedAuthorString += ']';
      }
    } else {
      formattedAuthorString = "No Author"
    }
    bookSpan.textContent = formattedAuthorString + " - " + result.volumeInfo.title;

    bookItem.appendChild(bookSpan);
    bookList.appendChild(bookItem);

    // Add click listener to expand with description
    bookItem.addEventListener('click', function() {
      let bookDescription = bookItem.querySelector(".book-description");

      // Add description if not already present in DOM
      if (!bookDescription) {
        let descriptionSpan = document.createElement("span");
        descriptionSpan.className = "book-description";
        descriptionSpan.textContent = result.volumeInfo.description ? result.volumeInfo.description : "No description found";
        descriptionSpan.setAttribute('aria-label', 'Display description of book');
        bookItem.appendChild(descriptionSpan);
      } else {
        // Toggle the display of description
        bookDescription.style.display = bookDescription.style.display === 'none' ? 'block' : 'none';
      }
    });
  }
}

// Formats the pagination buttons at the bottom of the page
function formatPagination(results) {
  let numPages = Math.ceil(results.length/10)
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= numPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = 'pagination-button';
    button.setAttribute('aria-label', 'Click me to go to page' + i);
    button.addEventListener('click', () => {
      // The current page (i) needs to be reduced by 1 due to array 0 index
      formatResults(results, i-1);
      formatPagination(results);
    });
    paginationContainer.appendChild(button);
  }
}

// Formats the search stat results
function formatStats(results) {
  document.getElementById('numResults').textContent = "Total number of search results: " + results.length;

  document.getElementById('mostCommonAuthor').textContent = "Most common author: " + findMostCommonAuthor(results);

  const publicationDates = results.map(item => item.volumeInfo.publishedDate || null)
                                    .filter(date => date !== null)
                                    .map(date => new Date(date));
  document.getElementById('earliestPubDate').textContent = "Earliest publication date: " + findPublicationDate(publicationDates, true);
  document.getElementById('recentPubDate').textContent = "Most recent publication date: " + findPublicationDate(publicationDates, false);
  document.getElementById('serverResponseTime').textContent = "Server response time: " + RESPONSE_TIME + " ms";
}

// Formats the search stat results when no responses are recorded
function formatNoResults(responseTime) {
  document.getElementById('numResults').textContent = "Total number of search results: 0";
  document.getElementById('mostCommonAuthor').textContent = "Most common author: n/a";
  document.getElementById('earliestPubDate').textContent = "Earliest publication date: n/a";
  document.getElementById('recentPubDate').textContent = "Most recent publication date: n/a";
  document.getElementById('serverResponseTime').textContent = "Server response time: " + RESPONSE_TIME + " ms";

  return;
}

// Helper function to find the most common author
function findMostCommonAuthor(results) {
  const authors = results.flatMap(result => result.volumeInfo.authors || []);
  if (authors.length == 0) {
    return null;
  }

  const frequencyAuthorMap = authors.reduce((map, author) => {
    map.set(author, (map.get(author) || 0) + 1);
    return map;
  }, new Map());

  const mostCommonAuthor = [...frequencyAuthorMap.entries()].reduce((max, entry) => (entry[1] > max[1] ? entry : max));
  return mostCommonAuthor[0];
}

// Helper function to find the most recent or earliest publication date
function findPublicationDate(dates, isEarliest) {
  if (dates.length === 0) {
    return null;
  }

  if (isEarliest) {
    return new Date(Math.min(...dates));
  } else {
    return new Date(Math.max(...dates));
  }
}