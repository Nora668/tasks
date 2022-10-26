import { text } from "stream/consumers";
import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const published: Question[] = [];
    questions.filter((question: Question) =>
        question.published === true ? published.push(question) : question
    );
    return published;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const nonEmpty: Question[] = [];
    questions.filter((question: Question) =>
        question.body !== "" ||
        question.expected !== "" ||
        question.options.length > 0
            ? nonEmpty.push(question)
            : question
    );
    return nonEmpty;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const newQ: Question[] = [...questions];
    const found = newQ.find(
        (question: Question): boolean => question.id === id
    );
    if (found) return found;
    return null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const removed: Question[] = [];
    questions.filter((question: Question) =>
        question.id !== id ? removed.push(question) : question
    );
    return removed;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const newQ: string[] = [];
    questions.map((question: Question) => newQ.push(question.name));
    return newQ;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const pnum: number[] = [];
    questions.map((question: Question) => pnum.push(question.points));
    const count = pnum.reduce((total: number, num: number) => total + num, 0);
    return count;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const published = questions.filter(
        (question: Question): boolean => question.published === true
    );
    return sumPoints(published);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const line1 = "id,name,options,points,published";
    const newQ = questions.map(
        (question: Question) =>
            "\n" +
            question.id.toString() +
            "," +
            question.name.toString() +
            "," +
            question.options.length.toString() +
            "," +
            question.points.toString() +
            "," +
            question.published.toString()
    );
    return line1 + newQ.join("");
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const answer: Answer[] = questions.map(
        (question: Question): Answer => ({
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false
        })
    );
    return answer;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const newQ: Question[] = questions.map(
        (question: Question): Question => ({ ...question, published: true })
    );
    return newQ;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    const type = questions.every(
        (question: Question): boolean => questions[1].type === question.type
    );
    return type;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const newQ: Question[] = [...questions];
    const found = newQ.map((question: Question) =>
        question.id === targetId ? { ...question, name: newName } : question
    );
    return found;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const newQ = questions.map((question: Question): Question => {
        if (question.id === targetId) {
            question = { ...question, type: newQuestionType };
            if (newQuestionType !== "multiple_choice_question") {
                return { ...question, options: [] };
            }
        }
        return { ...question };
    });
    return newQ;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    const newQ: Question[] = questions.map(
        (question: Question): Question => ({
            ...question,
            options: [...question.options]
        })
    );
    const A = newQ.map((question: Question) => {
        if (question.id === targetId) {
            if (targetOptionIndex === -1) {
                return {
                    ...question,
                    options: [...question.options, newOption]
                };
            }
            // question.options.map((option: question) =>
            question.options.splice(targetOptionIndex, 1, newOption);
        }
        return question;
    });
    return A;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const newA: Question[] = [];
    questions.map((question: Question) => {
        newA.push(question);
        if (question.id === targetId) {
            newA.push(duplicateQuestion(newId, question));
        }
    });
    return newA;
}
