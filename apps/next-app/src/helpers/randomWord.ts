import { generateSlug, RandomWordOptions, totalUniqueSlugs } from "random-word-slugs";

const options: RandomWordOptions<3> = {
    format: "camel",
    categories: {
        noun: ["animals", "food", "profession", "science", "technology", "business"],
        adjective: ["color", "appearance", "shapes", "sounds", "taste"],

    },
    partsOfSpeech: ["adjective", "adjective", "noun"],
};

const randomNumber = Math.floor(Math.random() * 10000);


const randomNumberString = JSON.stringify(randomNumber);
const slug = generateSlug(3, options);

const preparedWord = slug + randomNumber;

export default preparedWord;


