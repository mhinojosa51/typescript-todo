import React, { FunctionComponent, useEffect, useState } from "react";
import "./CommentsViewer.scss";
import { URLS } from "../../enums/urls";
import { Comment } from "../types";
import { useFetchData } from "../../hooks";
import { CommentItem } from "./CommentItem";

export const CommentsViewer: FunctionComponent = () => {
    const {
        isLoading,
        data,
        hasError,
    }: { isLoading: boolean; data: Comment[]; hasError: boolean } =
        useFetchData(URLS.COMMENTS_URL);
    const [commentDescription, setCommentDescription] = useState<string>(
        "Click a comment to see its full text"
    );
    const [commentPos, setCommentPos] = useState<DOMRect>({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON: () => null,
    });

    const clickHandler = (ev: React.MouseEvent<HTMLDivElement>) => {
        const rect = ev.currentTarget.getBoundingClientRect();
        console.log(rect);
        const id = ev.currentTarget.dataset.id;
        if (id) {
            setCommentDescription(data[+id - 1].body);
            setCommentPos(rect);
        }
    };
    return (
        <div className='comments-view-container'>
            <section className='comments-view-comments-bar'>
                {isLoading && <div>Loading....</div>}
                {!isLoading &&
                    !hasError &&
                    data.map((comment: Comment) => {
                        return (
                            <CommentItem
                                key={comment.id}
                                name={comment.name}
                                id={comment.id}
                                onClick={clickHandler}
                            />
                        );
                    })}
            </section>
            <section
                style={{
                    transform: `translate(0px, ${
                        commentPos.top + window.scrollY
                    }px)`,
                }}
                className='comments-section-details'>
                <h3 style={{ textAlign: "center", color: "#df740c" }}>
                    Comment Body
                </h3>
                <h3>{commentDescription}</h3>
            </section>
        </div>
    );
};
