import React, {
    createElement,
    FunctionComponent,
    useEffect,
    useRef,
    useState,
} from "react";
import throttle from "lodash/throttle";
import { WindowTestingItem } from "./WindowingTestComp";
import "./WindowingComponent.scss";

type WindowingComponentProps = {
    itemData: any[];
    element: typeof WindowTestingItem;
};

export const WindowingComponent = ({
    element,
    itemData,
}: WindowingComponentProps) => {
    const [elementsToRender, setElementsToRender] = useState<any[]>([]);
    const [placeHolderBottomRows, setPlaceHolderBottomRows] = useState<number>(
        itemData.length - 6
    );

    const currentScrollPos = useRef<number>(0);
    const [scrollRows, setScrollRows] = useState<number>(0);

    useEffect(() => {
        let elements = [];
        for (let i = scrollRows; i < scrollRows + 6; i++) {
            elements.push(
                createElement(element, { name: itemData[i] + 1, key: i })
            );
        }

        setElementsToRender(elements);
    }, [scrollRows, element, itemData]);

    const handleScroll = (ev: React.UIEvent<HTMLDivElement>) => {
        currentScrollPos.current = ev.currentTarget.scrollTop;

        const diff = scrollDiff(
            ev.currentTarget.scrollTop,
            ev.currentTarget.clientHeight
        );

        if (diff !== scrollRows) {
            setScrollRows(diff);
        }
    };

    const scrollDirection = (oldPos: number, newPos: number) => {
        return oldPos > newPos ? "up" : "down";
    };

    const scrollDiff = (scrollTop: number, clientHeight: number) => {
        return Math.abs(Math.floor(scrollTop / 48));
    };

    console.log(scrollRows);

    return (
        <div className='windowing-component-container' onScroll={handleScroll}>
            <div style={{ height: `${scrollRows * 48}px` }}></div>
            {elementsToRender}
            <div
                style={{
                    height: `${(placeHolderBottomRows - scrollRows) * 48}px`,
                }}></div>
        </div>
    );
};
