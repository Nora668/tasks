import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function ChangeColor(): JSX.Element {
    const [colors, setColor] = useState<string>("red");
    const COLORS = [
        "red",
        "blue",
        "green",
        "orange",
        "purple",
        "cyan",
        "magenta",
        "white",
        "black"
    ];

    function updateColor(event: React.ChangeEvent<HTMLInputElement>) {
        setColor(event.target.value);
    }
    return (
        <div>
            <h3>Change Color</h3>
            <Form.Group controlId="ChangeColorForm">
                <Form.Label>Select a color</Form.Label>
                {COLORS.map((color: string) => (
                    <Form.Check
                        inline
                        type="radio"
                        name="colors"
                        onChange={updateColor}
                        id={"color-" + color}
                        key={color}
                        style={{ backgroundColor: color }}
                        label={color}
                        value={color}
                        checked={colors === color}
                    />
                ))}
            </Form.Group>
            <div>
                You have selected{" "}
                <span
                    data-testid="colored-box"
                    style={{ backgroundColor: colors }}
                >
                    {" "}
                    {colors}
                </span>
            </div>
        </div>
    );
}
