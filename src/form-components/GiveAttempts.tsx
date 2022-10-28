import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export function GiveAttempts(): JSX.Element {
    type ChangeEvent = React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >;

    const [attempt, setAttempt] = useState<number>(3);
    const [request, setRequest] = useState<number>(0);

    function remove() {
        setAttempt(attempt - 1);
    }

    function add() {
        let attempts = attempt;
        if (!Number.isInteger(request)) {
            attempts = attempt;
        } else {
            attempts = attempt + request;
        }
        setAttempt(attempts);
    }

    return (
        <div>
            <h3>Give Attempts</h3>
            <Form.Group controlId="Attempts">
                <Form.Label>Attempts: {attempt}</Form.Label>
                <Form.Control
                    type="number"
                    value={request}
                    onChange={(event: ChangeEvent) =>
                        setRequest(parseInt(event.target.value))
                    }
                />
            </Form.Group>
            <div>
                <Button onClick={remove} disabled={attempt === 0}>
                    Use
                </Button>
                <Button onClick={add}>Gain</Button>
            </div>
        </div>
    );
}
