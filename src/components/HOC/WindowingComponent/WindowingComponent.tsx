import React, {
    createElement,
    FunctionComponent,
    useEffect,
    useRef,
    useState,
    Children,
    ReactNode,
    cloneElement,
} from "react";
import "./WindowingComponent.scss";

type WindowingComponentProps = {
    children: ReactNode;
    itemHeight: number;
    containerHeight: number;
};

export const WindowingComponent = ({
    children,
    itemHeight,
    containerHeight,
}: WindowingComponentProps) => {
    const [firstRender, setFirstRender] = useState<boolean>(false);

    const [scrollRows, setScrollRows] = useState<number>(0);

    // create a ref to place on the parent div of the first child element so we can grab that childs height by calling getBoundingClientRect on it
    const firstElementRef = useRef<HTMLDivElement>(null);

    // the computed height for each child which we get after the 1st render, set it to 0 for now
    const [computedItemHeight, setComputedItemHeight] = useState<number>(0);

    // the maximum rows to show given the container height, computedItemHeight or the itemHeight if the prop is passed
    const maxRowsToShow =
        computedItemHeight > 0
            ? Math.round(containerHeight / computedItemHeight)
            : Math.round(containerHeight / itemHeight);

    // the amount of placeholder rows based on how many children there are and how many we can fit into the parent container
    // value is used to calculate the height of a placeholder div that mimics the height if all children were rendered at once
    const [placeHolderBottomRows, setPlaceHolderBottomRows] = useState<number>(
        Children.count(children) - maxRowsToShow
    );

    useEffect(() => {
        const firstElementHeight: number | undefined =
            firstElementRef.current?.firstElementChild?.getBoundingClientRect()
                .height;

        if (firstElementHeight) {
            setComputedItemHeight(firstElementHeight);
            setFirstRender(true);
            setPlaceHolderBottomRows(
                Children.count(children) -
                    Math.round(containerHeight / firstElementHeight)
            );
        }
    }, []);

    // a scroll handler
    const handleScroll = (ev: React.UIEvent<HTMLDivElement>) => {
        const diff = scrollDiff(
            ev.currentTarget.scrollTop,
            ev.currentTarget.clientHeight
        );

        if (diff !== scrollRows) {
            setScrollRows(diff);
        }
    };

    // returns the absolute value of dividing the scrollTop property of a scrollevent by the computedItemHeight
    // this gives an approximation of how many rows the user would have scrolled by so that we can calculate which children to render, and update the height of the 2 placeholder divs
    // that simulate the rows not shown to the user
    const scrollDiff = (scrollTop: number, clientHeight: number) => {
        return Math.abs(Math.floor(scrollTop / computedItemHeight));
    };

    // if this is the first render cycle we render just the 1st child so that we can calculate gets its computed height so that we can estimate the number of rows
    // there would be in total if all children were rendered at once
    if (!firstRender) {
        const firstElement = Children.toArray(children)[0];
        return (
            <div
                style={{
                    height: `${containerHeight}px
        `,
                }}
                className='windowing-component-container'
                onScroll={handleScroll}
                ref={firstElementRef}>
                {firstElement}
            </div>
        );
    }
    // after the 1st render we start by rendering an empty div with a height that is equivalent to all the children that would be off screen given the users current scroll position,
    // this height increases as as the user scrolls down and decreases when they scroll up
    // we then render the children that would be shown at this scroll position up to the maximum that would fit in the current container
    // finally we render another empty div whose height is set to all the children that would be outside the bottom of the container view, this height decreases as the user scrolls down and increases as they scroll up
    return (
        <div
            style={{
                height: `${containerHeight}px
            `,
            }}
            className='windowing-component-container'
            onScroll={handleScroll}>
            <div
                style={{
                    height: `${scrollRows * computedItemHeight}px`,
                }}></div>
            {Children.toArray(children).slice(
                scrollRows,
                scrollRows + maxRowsToShow
            )}
            <div
                style={{
                    height: `${
                        (placeHolderBottomRows - scrollRows) *
                        computedItemHeight
                    }px`,
                }}></div>
        </div>
    );
};
