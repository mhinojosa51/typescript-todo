import React from "react";
import "./styles/index.scss";
import { Dashboard } from "./components/Dashboard";
import { UseCallbackList } from "./components/UseCallbackList";
import { CommentsViewer } from "./components/CommentsViewer";
import { WindowingTestComponent } from "./components/HOC/WindowingComponent";

function App() {
    return (
        <div className='App'>
            <WindowingTestComponent />
        </div>
    );
}

export default App;
