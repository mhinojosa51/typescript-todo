import React, { memo } from "react";
import { WindowingComponent } from "./WindowingComponent";
import "../../CommentsViewer/CommentsViewer.scss";
import { arrayBuffer } from "stream/consumers";

type WindowingTestingItemProps = {
    name: number;
    onClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
};

export const WindowTestingItem = memo(
    ({ name, onClick }: WindowingTestingItemProps) => {
        return (
            <div className='comment-item' data-name={name} onClick={onClick}>
                {name}
            </div>
        );
    }
);

const onClickCallback = (ev: React.MouseEvent<HTMLDivElement>) => {
    console.log(ev.currentTarget.dataset.name);
};

export const WindowingTestComponent = () => {
    let Arr = new Array(1000).fill(0);
    Arr = Arr.map((item, idx) => idx + 1);

    return (
        <div className='comments-view-container'>
            <h3 id='comments-section-header'>Windowing Component</h3>
            <WindowingComponent itemHeight={48} containerHeight={600}>
                {Arr.map((item, idx) => {
                    return (
                        <WindowTestingItem
                            key={idx}
                            name={item}
                            onClick={onClickCallback}></WindowTestingItem>
                    );
                })}
            </WindowingComponent>
        </div>
    );
};
