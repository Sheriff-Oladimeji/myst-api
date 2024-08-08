// const fetchAndSaveQuotes = async () => {
//   const options = {
//     method: "GET",
//     url: "https://famous-quotes4.p.rapidapi.com/random",
//     params: {
//       category: "all",
//       count: "2000",
//     },
//     headers: {
//       "x-rapidapi-key": "81fa6cf4ecmshb9f94060066c7f3p1c4b1djsn9eb2248cb444",
//       "x-rapidapi-host": "famous-quotes4.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     const quotes = response.data;

//     const quotePromises = quotes.map((quoteData) => {
//       const { text, author, category } = quoteData;
//       const quote = text;
//       return Post.create({ quote, author, category });
//     });

//     // Wait for all the quotes to be saved in the database
//     await Promise.all(quotePromises);

//     console.log("Quotes fetched and saved to the database");
//   } catch (error) {
//     console.error("Error fetching quotes:", error.message);
//   }
// };

// fetchAndSaveQuotes()
