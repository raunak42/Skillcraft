import { generateSlug, RandomWordOptions } from "random-word-slugs";

export const options: RandomWordOptions<3> = {
    format: "camel",
    categories: {
        noun: ["animals", "food", "profession", "science", "technology", "business"],
        adjective: ["color", "appearance", "shapes", "sounds", "taste"],

    },
    partsOfSpeech: ["adjective", "adjective", "noun"],
};



export const generateRandomWord = async() => {
    "use server"  //If not for "use server" the "yarn build" build process calls this function only once and the same preparedWord is delivered every time this function is called.
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomNumberString = JSON.stringify(randomNumber);
    const slug = generateSlug(3, options);

    const preparedWord = slug + randomNumberString;
    return preparedWord;
}



