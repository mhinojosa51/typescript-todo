import { FunctionComponent } from "react";
import "./ListItem.scss";

interface ListItemIProps {
    id: number;
    title: string;
    onClick: () => void;
}

export const ListItem: FunctionComponent<ListItemIProps> = ({
    id,
    title,
    onClick,
}): JSX.Element => {
    return (
        <div className='todo-item' onClick={onClick}>
            {title}
        </div>
    );
};
