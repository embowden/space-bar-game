const express = require("express");
const readFile = require("../utils/helper-functions");
// const shuffle = require("../utils/helper-functions");
const router = express.Router();
const fs = require("fs");

module.exports = router;

// RETURNS ALL DATA IN JSON FILE
// NOT CURRENTLY IN USE
router.get("/", (req, res) => {
  const mdnData = readFile("./data/mdn.json");
  if (!mdnData) {
    res.status(404).json("Nothing found");
  } else {
    res.status(200).json(mdnData);
  }
});

//RETURNS RANDOM SUMMARY, FILTERS OUT EXISTING ONE EACH TIME
router.post("/summary", (req, res) => {
  const mdnData = readFile("./data/mdn.json");
  const id = req.body.id;
  if (!mdnData) {
    res.status(404).json("Nothing found");
  } else {
    const filteredArray = mdnData.filter((item) => !id.includes(item.id));
    const IDandSummary = filteredArray.map((object) => {
      return { id: object.id, summary: object.summary };
    });
    const randomSummary =
      IDandSummary[Math.floor(Math.random() * IDandSummary.length)];
    res.status(200).json(randomSummary);
  }
});

// RETURNS RANDOM CODELINE, FILTERS OUT EXISTING ONE EACH TIME
// FOR CODING MODE- NOT CURRENTLY IN USE
router.post("/code", (req, res) => {
  const mdnData = readFile("./data/mdn.json");
  const id = req.body.id;
  if (!mdnData) {
    res.status(404).json("Nothing found");
  } else {
    const filteredArray = mdnData.filter((item) => !id.includes(item.id));
    const IDandCode = filteredArray.map((object) => {
      return { id: object.id, code: object.code };
    });
    const randomSummary =
      IDandCode[Math.floor(Math.random() * IDandCode.length)];
    res.status(200).json(randomSummary);
  }
});

//RETURN TITLE AND WEBSITE LINK USING ID INFORMATION
router.post("/links", (req, res) => {
  const mdnData = readFile("./data/mdn.json");
  const id = req.body.id;
  if (!mdnData) {
    res.status(404).json("Nothing found");
  } else {
    const filteredArray = mdnData.filter((item) => id.includes(item.id));
    const titleAndLink = filteredArray.map((object) => {
      return { id: object.id, title: object.title, link: object.link };
    });
    res.status(200).json(titleAndLink);
  }
});

//RETURNS ALL SUMMARY VALUES
//SHUFFLES THE ORDER OF THE SUMMARY VALUES
// router.get("/summaries", (req, res) => {
//   const mdnData = readFile("./data/mdn.json");
//   if (!mdnData) {
//     res.status(404).json("Nothing found");
//   } else {
//     let sentenceArray = shuffle(
//       mdnData.map((object) => {
//         return object.summary;
//       })
//     );
//     res.status(200).json(sentenceArray);
//   }
// });

// //FUNCTION TO SHUFFLE ARRAY CONTENTS
// const shuffle = (array) => {
//   let currentIndex = array.length,
//     randomIndex;

//   // WHILE THERE ARE ELEMENTS REMAINING
//   while (currentIndex != 0) {
//     // PICK A REMAINING ELEMENT
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     // SWAP IT WITH CURRENT ELEMENT
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }
//   return array;
// };

//RETURNS INITIAL RANDOM SUMMARY
// router.get("/summary", (req, res) => {
//   const mdnData = readFile("./data/mdn.json");
//   if (!mdnData) {
//     res.status(404).json("Nothing found");
//   } else {
//     let summaryArray = mdnData.map((object) => {
//       return { id: object.id, summary: object.summary };
//     });
//     let randomSummary =
//       summaryArray[Math.floor(Math.random() * summaryArray.length)];
//     res.status(200).json(randomSummary);
//   }
// });
