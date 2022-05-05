import { render } from "@testing-library/react";
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { URLS } from "../../enums/urls";
import "./Dashboard.scss";
import { Todo } from "../types";
import { ListItem } from "../ListItem";

export const Dashboard: FunctionComponent = (): JSX.Element => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(URLS.TODOS_URL);
            const data: Todo[] = await res.json();

            setTodos(data);
        }

        fetchData();
    }, []);

    const searchTodos = (todos: Todo[]) => {
        const searchParam = searchText;
        return todos.filter((todo: Todo) => todo.title.includes(searchParam));
    };

    const deleteToDo = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (ev.currentTarget.dataset.id) {
            let selectedId = +ev.currentTarget.dataset.id;
            setTodos(todos.filter((todo: Todo) => todo.id !== selectedId));
        }
    };

    const memoizedDeleteToDo = useCallback(deleteToDo, [todos]);

    const renderTodoList = (): JSX.Element[] => {
        return searchTodos(todos).map((todo: Todo) => {
            return (
                <ListItem
                    onClick={memoizedDeleteToDo}
                    id={todo.id}
                    title={todo.title}
                    key={todo.id}
                />
            );
        });
    };

    return (
        <div className={`dashboard-container ${theme}`}>
            <section className='search-box'>
                <label htmlFor='search-todos'>Search</label>
                <input
                    name='search-todos'
                    type='text'
                    onChange={(ev) => setSearchText(ev.currentTarget.value)}
                />
            </section>
            <section className='theme-selector'>
                <button onClick={() => setTheme("dark")}>Dark Theme</button>
                <button onClick={() => setTheme("light")}>Light Theme</button>
            </section>
            {renderTodoList()}
        </div>
    );
};
