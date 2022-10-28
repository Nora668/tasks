import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    type ChangeEvent = React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >;
    const [userAnswer, setUserAnswer] = useState<string>("");

    function updateAnswer(event: ChangeEvent) {
        setUserAnswer(event.target.value);
    }
    return (
        <div>
            <h3>Check Answer</h3>
            <Form.Group controlId="">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={userAnswer}
                    onChange={updateAnswer}
                />
            </Form.Group>
            {userAnswer === expectedAnswer ? "✔️" : "❌"}
        </div>
    );
}
