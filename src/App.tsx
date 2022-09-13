import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <h1>New Header</h1>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload. Editor: Yuqing Pan Hello World
            </p>
            <img
                src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/11/what-is-html-3.jpg"
                alt="Just some random image"
            />
            <ul>
                <li>Element 1</li>
                <li>Element 2</li>
                <li>Element 3</li>
            </ul>
            <Button onClick={() => console.log("Hello World!")}>
                Log Hello World
            </Button>
            <div className="App-rect">
                <Container>
                    <Row>
                        <Col>First column</Col>
                        <br></br>
                        <Col>Second column</Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default App;
