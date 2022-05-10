import React, { FunctionComponent, useEffect, useState, useRef } from "react";
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

    const commentHeaderRef = useRef<HTMLHeadingElement>(null);

    // calculate the height offset of the comment container by getting the height
    // of the comment viewer header + 5px from the grid gap CSS value
    const commentOffset = commentHeaderRef.current
        ? commentHeaderRef.current.getBoundingClientRect().height + 5
        : 0;

    const eventHandler = (
        ev:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>
    ) => {
        const rect = ev.currentTarget.getBoundingClientRect();
        const id = ev.currentTarget.dataset.id;
        if (id) {
            setCommentDescription(data[+id - 1].body);
            setCommentPos(rect);
        }
    };
    return (
        <div className='comments-view-container'>
            <section ref={commentHeaderRef} id='comments-section-header'>
                <h2>Comment Viewer</h2>
            </section>
            <section className='comments-view-body'>
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
                                    onClick={eventHandler}
                                />
                            );
                        })}
                </section>
                <section
                    style={{
                        transform: `translate(0px, ${
                            commentPos.top === 0
                                ? 0
                                : commentPos.top +
                                  window.scrollY -
                                  commentOffset
                        }px)`,
                    }}
                    className='comments-section-details'>
                    <h3 style={{ textAlign: "center", color: "#df740c" }}>
                        Comment Body
                    </h3>
                    <h3>{commentDescription}</h3>
                </section>
            </section>
        </div>
    );
};
