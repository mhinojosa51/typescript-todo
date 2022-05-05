import { FunctionComponent, memo } from "react";
import "./ListItem.scss";

interface ListItemIProps {
    id: number;
    title: string;
    onClick: React.MouseEventHandler;
}

const ListItemBase: FunctionComponent<ListItemIProps> = ({
    id,
    title,
    onClick,
}): JSX.Element => {
    return (
        <div className='todo-item' onClick={onClick} data-id={id}>
            {title}
        </div>
    );
};

export const ListItem = memo(ListItemBase);
