import React, { FunctionComponent, memo } from "react";
import { Comment } from "../types";

interface CommentItemBaseIProps {
    name: string;
    id: number;
    onClick: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
}

const CommentItemBase: FunctionComponent<CommentItemBaseIProps> = ({
    name,
    id,
    onClick,
}) => {
    return (
        <div
            tabIndex={0}
            className='comment-item'
            onClick={onClick}
            onKeyDown={(ev) => {
                if (ev.code === "Space") {
                    ev.preventDefault();
                    onClick(ev);
                }
            }}
            data-id={id}>
            {name}
        </div>
    );
};

export const CommentItem = memo(CommentItemBase);
