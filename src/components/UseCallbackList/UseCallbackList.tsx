import React, { FunctionComponent, useCallback, useState } from "react";
import "./UseCallbackList.scss";
import { UseCallbackListItem } from "./UseCallbackListItem";

export const UseCallbackList: FunctionComponent = () => {
    const [text, setText] = useState<string>("");
    const values = new Array(100).fill(0);

    const printIdx = (ev: React.MouseEvent<HTMLDivElement>) => {
        console.log(ev.currentTarget.dataset.title);
    };

    const memoizedPrintIdx = useCallback(printIdx, []);

    return (
        <div className='full-container'>
            <section className='search-callback'>
                <label htmlFor='callback-searchtext'>Search</label>
                <input
                    name='callback-searchtext'
                    id='callback-searchtext'
                    value={text}
                    onChange={(ev) => setText(ev.currentTarget.value)}
                />
            </section>
            {values.map((val, idx) => {
                return (
                    <UseCallbackListItem
                        onClick={memoizedPrintIdx}
                        key={idx}
                        title={idx.toString()}
                    />
                );
            })}
        </div>
    );
};
