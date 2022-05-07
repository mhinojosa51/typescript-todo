import React, { FunctionComponent, memo } from "react";
import { Comment } from "../types";

interface CommentItemBaseIProps {
    name: string;
    id: number;
    onClick: React.MouseEventHandler;
}

const CommentItemBase: FunctionComponent<CommentItemBaseIProps> = ({
    name,
    id,
    onClick,
}) => {
    return (
        <div className='comment-item' onClick={onClick} data-id={id}>
            {name}
        </div>
    );
};

export const CommentItem = memo(CommentItemBase);
