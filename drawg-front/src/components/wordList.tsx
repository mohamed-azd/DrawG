import { Button } from "react-bootstrap"

export function WordList(props: { words: Array<string>, onChoose: Function }) {

    return (
        <div id="wordList">
            {
                (props.words?.map((word) => {
                    return (
                        <div id="wordContainer" key={word}>
                            <Button id={word} key={word} className="word" size="lg" onClick={e => props.onChoose((e.target as HTMLButtonElement).id)}>
                                {word}
                            </Button>
                        </div>
                    )
                })) ??
                <p>error</p>
            }
        </div>
    )

}