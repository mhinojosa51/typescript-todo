import { render } from "@testing-library/react";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { URLS } from "../../enums/urls";
import "./Dashboard.scss";
import { Todo } from "../types";
import { ListItem } from "../ListItem";

export const Dashboard: FunctionComponent = (): JSX.Element => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchText, setSearchText] = useState<string>("");

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

    const deleteToDo = (id: number) => {
        setTodos(todos.filter((todo: Todo) => todo.id !== id));
    };

    const memoizedDeleteToDo = useCallback(deleteToDo, []);

    const renderTodoList = (): JSX.Element[] => {
        return searchTodos(todos).map((todo: Todo) => {
            return (
                <ListItem
                    onClick={() => deleteToDo(todo.id)}
                    id={todo.id}
                    title={todo.title}
                    key={todo.id}
                />
            );
        });
    };

    return (
        <div className='dashboard-container'>
            <section className='search-box'>
                <label htmlFor='search-todos'>Search</label>
                <input
                    name='search-todos'
                    type='text'
                    onChange={(ev) => setSearchText(ev.currentTarget.value)}
                />
                {/* <button className='search-button'>Submit</button> */}
            </section>
            {renderTodoList()}
        </div>
    );
};
