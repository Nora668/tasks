import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): JSX.Element {
    type Holiday =
        | "Chinese New Year 🧧"
        | "Dragonboat Festival 🎏"
        | "Halloween 🎃"
        | "Diiwali 🪔"
        | "Christmas 🎄";
    const [holiday, setHoliday] = useState<Holiday>("Chinese New Year 🧧");

    const alphaTransition: Record<Holiday, Holiday> = {
        "Chinese New Year 🧧": "Christmas 🎄",
        "Christmas 🎄": "Diiwali 🪔",
        "Diiwali 🪔": "Dragonboat Festival 🎏",
        "Dragonboat Festival 🎏": "Halloween 🎃",
        "Halloween 🎃": "Chinese New Year 🧧"
    };

    const yearsTransition: Record<Holiday, Holiday> = {
        "Chinese New Year 🧧": "Dragonboat Festival 🎏",
        "Dragonboat Festival 🎏": "Halloween 🎃",
        "Halloween 🎃": "Diiwali 🪔",
        "Diiwali 🪔": "Christmas 🎄",
        "Christmas 🎄": "Chinese New Year 🧧"
    };

    function changeByAlph(): void {
        const alph = alphaTransition[holiday];
        setHoliday(alph);
    }

    function changeByYear(): void {
        const year = yearsTransition[holiday];
        setHoliday(year);
    }
    return (
        <>
            <div>Cycle Holiday</div>
            <div>
                <Button onClick={changeByAlph}>Alphabet</Button>
                <span>Holiday: {holiday}</span>
                <Button onClick={changeByYear}>Year</Button>
            </div>
        </>
    );
}
