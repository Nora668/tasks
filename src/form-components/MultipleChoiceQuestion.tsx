import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    type ChangeEvent = React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >;

    const [choice, setChoice] = useState<string>(options[0]);

    function changeChoice(event: ChangeEvent) {
        setChoice(event.target.value);
    }
    return (
        <div>
            <h3>Multiple Choice Question</h3>
            <Form.Group controlId="MultipleChoiceQuestion">
                <Form.Label>Choose the answer</Form.Label>
                <Form.Select value={choice} onChange={changeChoice}>
                    {options.map((option: string) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {choice === expectedAnswer ? "✔️" : "❌"}
        </div>
    );
}
