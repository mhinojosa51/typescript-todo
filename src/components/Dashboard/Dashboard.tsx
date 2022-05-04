import { render } from "@testing-library/react";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { URLS } from "../../enums/urls";
import "./Dashboard.scss";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const Dashboard: FunctionComponent = (): JSX.Element => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(URLS.TODOS_URL);
            const data: Todo[] = await res.json();

            setTodos(data);
            setFilteredTodos(data);
        }

        fetchData();
    }, []);

    const searchTodos = () => {
        const searchParam = searchText;
        setFilteredTodos(
            todos.filter((todo: Todo) => todo.title.includes(searchParam))
        );
    };

    const deleteToDo = (id: number) => {
        setTodos(todos.filter((todo: Todo) => todo.id !== id));
    };

    const memoizedDeleteToDo = useCallback(deleteToDo, []);

    const renderTodoList = (): JSX.Element[] => {
        return filteredTodos.map((todo: Todo) => {
            return (
                <div
                    key={todo.id}
                    className='todo-item'
                    onClick={() => memoizedDeleteToDo(todo.id)}>
                    {todo.title}
                </div>
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
                <button className='search-button' onClick={searchTodos}>
                    Submit
                </button>
            </section>
            {renderTodoList()}
        </div>
    );
};
