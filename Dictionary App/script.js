// Selecting the form and result display area from the DOM
const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

// Adding an event listener to the form to trigger when it is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page on submission
    getWordInfo(form.elements[0].value); // Calls the getWordInfo function with the input value (the word entered by the user)
});

// This is an asynchronous function that will fetch the word data from the dictionary API
const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = "Fetching Data"; // Shows a message while data is being fetched

        // Fetches data from the dictionary API for the given word
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json(); // Converts the response to JSON format

        // Extracting the first definition of the word
        let definitions = data[0].meanings[0].definitions[0];

        // Updating the resultDiv with the word, part of speech, meaning, and example (if found)
        resultDiv.innerHTML = `
        <h2><strong>Word : </strong>${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning : </strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
        <p><strong>Example : </strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
        `;
        
        // Handling the antonyms section
        resultDiv.innerHTML += `<p><strong>Antonyms : </strong></p>`
        if (definitions.antonyms.length === 0) { // If no antonyms are available
            resultDiv.innerHTML += `<span>Not Found</span>`; // Display 'Not Found'
        } else {
            for (let i = 0; i < definitions.antonyms.length; i++) { // Loop through antonyms
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`; // Display each antonym
            }
        }

        // Handling the synonyms section
        resultDiv.innerHTML += `<p><strong>Synonyms : </strong></p>`
        if (definitions.synonyms.length === 0) { // If no synonyms are available
            resultDiv.innerHTML += `<p>Not Found</p>`; // Display 'Not Found'
        } else {
            for (let i = 0; i < definitions.synonyms.length; i++) { // Loop through synonyms
                resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`; // Display each synonym
            }
        }

        // Adding a "Read More" link to the dictionary API source URL
        // This line isn't working properly because it's not being added to the DOM, as it's not concatenated with the existing innerHTML.
        // It should be added to the innerHTML like the other sections.
        // Here's the corrected version: 
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
    } 
    catch (error) {
        // If there's an error (such as the word not being found), display an error message
        resultDiv.innerHTML = `<p> Sorry, the word could not be found</p>`;
    }

    // console.log(data); // Uncomment to log the fetched data for debugging
    // alert("Word:" + word); // This would show an alert with the searched word (not necessary here)
}
