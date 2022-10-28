import React, { ReactHTML, useState } from "react";
import { Form } from "react-bootstrap";

export function EditMode(): JSX.Element {
    const [mode, setMode] = useState<boolean>(false);
    const [name, setName] = useState<string>("Your Name");
    const [student, setStudent] = useState<boolean>(true);

    function updateMode(event: React.ChangeEvent<HTMLInputElement>) {
        setMode(event.target.checked);
    }

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function updateStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setStudent(event.target.checked);
    }

    function print(): JSX.Element {
        if (student) {
            return <div>{name} is a student</div>;
        } else {
            return <div> {name} is not a student</div>;
        }
    }
    return (
        <div>
            <h3>Edit Mode</h3>
            <Form.Group controlId="mode">
                <Form.Check
                    type="switch"
                    id="edit"
                    label="mode"
                    checked={mode}
                    onChange={updateMode}
                />
                <div>
                    {mode ? (
                        <Form.Group controlId="modeForm">
                            <Form.Label>Enter your name:</Form.Label>
                            <Form.Control value={name} onChange={updateName} />
                            <Form.Check
                                type="switch"
                                id="switch student"
                                label="Is Student?"
                                name="student"
                                checked={student}
                                onChange={updateStudent}
                            />
                        </Form.Group>
                    ) : (
                        <div>{print()}</div>
                    )}
                </div>
            </Form.Group>
        </div>
    );
}
