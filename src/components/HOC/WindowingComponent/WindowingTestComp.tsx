import { memo } from "react";
import { WindowingComponent } from "./WindowingComponent";
import "../../CommentsViewer/CommentsViewer.scss";

type WindowingTestingItemProps = {
    name: number;
};

export const WindowTestingItem = memo(({ name }: WindowingTestingItemProps) => {
    return <div className='comment-item'>{name}</div>;
});

export const WindowingTestComponent = () => {
    let Arr = new Array(100000).fill(0);
    Arr = Arr.map((item, idx) => idx);

    return (
        <div className='comments-view-container'>
            <h3 id='comments-section-header'>Windowing Component</h3>
            <WindowingComponent
                itemData={Arr}
                element={WindowTestingItem}></WindowingComponent>
        </div>
    );
};
