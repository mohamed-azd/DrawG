import wordsBank from './words.json'

export function getRandomWords(nbWords: number): string[] {
    const words: Set<string> = new Set();
    while (words.size < nbWords) {
        let randomWord = getRandomWord();
        words.add(randomWord);
    }
    return Array.from(words);
}

function getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * wordsBank.words.length)
    return wordsBank.words[randomIndex]
}