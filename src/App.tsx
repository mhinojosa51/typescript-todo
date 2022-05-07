import React from "react";
import "./styles/index.scss";
import { Dashboard } from "./components/Dashboard";
import { UseCallbackList } from "./components/UseCallbackList";
import { CommentsViewer } from "./components/CommentsViewer";

function App() {
    return (
        <div className='App'>
            <CommentsViewer />
        </div>
    );
}

export default App;
