import { CommentsList } from "./comments-list";
import { CreateComment } from "./create-comment";

type CommentsProps = {
    discussionId: string;
};  // 评论属性

export const Comments = ({ discussionId }: CommentsProps) => {
    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-violet-600">评论：</h3>

                <CreateComment discussionId={discussionId} />  // 创建评论
            </div>
            <CommentsList discussionId={discussionId} />  // 评论列表
        </>
    );
}