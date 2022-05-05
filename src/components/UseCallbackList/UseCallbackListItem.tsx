import React, { FunctionComponent, memo } from "react";

interface UseCallbackListItemIProps {
    title: string;
    onClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

const UseCallbackListItemBase: FunctionComponent<UseCallbackListItemIProps> = ({
    title,
    onClick,
}) => {
    console.log("child rerender");
    return (
        <div
            className='search-text-list-item'
            onClick={onClick}
            data-title={title}>
            {title}
        </div>
    );
};

export const UseCallbackListItem = memo(UseCallbackListItemBase);
