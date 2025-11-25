import React from "react";
import ReactDOM from "react-dom/client";
import { Saludo } from "./Saludo";
import { Header } from "./Header";
import './index.css';
import { Card } from "./Card";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
        <Header />
        <Card />
    </>
);