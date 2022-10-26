import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): JSX.Element {
    const [changetype, setChange] = useState<QuestionType>(
        "short_answer_question"
    );
    const change = () => {
        if (changetype === "multiple_choice_question")
            setChange("short_answer_question");
        else if (changetype === "short_answer_question")
            setChange("multiple_choice_question");
    };
    return (
        <div>
            <Button onClick={change}>Change Type</Button>
            {changetype === "multiple_choice_question" && (
                <span>Multiple Choice Question</span>
            )}
            {changetype === "short_answer_question" && (
                <span>Short Answer Question</span>
            )}
        </div>
    );
}
