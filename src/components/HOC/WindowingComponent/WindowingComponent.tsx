import React, {
    createElement,
    FunctionComponent,
    useEffect,
    useRef,
    useState,
    Children,
} from "react";
import "./WindowingComponent.scss";

type WindowingComponentProps = {
    children: React.ReactNode | React.ReactNode[];
    itemHeight: number;
    containerHeight: number;
};

export const WindowingComponent = ({
    children,
    itemHeight,
    containerHeight,
}: WindowingComponentProps) => {
    const maxRowsToShow = Math.round(containerHeight / itemHeight);
    const [placeHolderBottomRows] = useState<number>(
        Children.count(children) - maxRowsToShow
    );

    const [scrollRows, setScrollRows] = useState<number>(0);

    const handleScroll = (ev: React.UIEvent<HTMLDivElement>) => {
        const diff = scrollDiff(
            ev.currentTarget.scrollTop,
            ev.currentTarget.clientHeight
        );

        if (diff !== scrollRows) {
            setScrollRows(diff);
        }
    };

    const scrollDiff = (scrollTop: number, clientHeight: number) => {
        return Math.abs(Math.floor(scrollTop / itemHeight));
    };

    return (
        <div className='windowing-component-container' onScroll={handleScroll}>
            <div style={{ height: `${scrollRows * 48}px` }}></div>
            {Children.toArray(children).slice(
                scrollRows,
                scrollRows + maxRowsToShow
            )}
            <div
                style={{
                    height: `${(placeHolderBottomRows - scrollRows) * 48}px`,
                }}></div>
        </div>
    );
};
