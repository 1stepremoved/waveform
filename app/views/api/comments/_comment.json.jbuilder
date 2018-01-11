json.extract! comment, :id, :body, :timestamp,  :created_at
json.userId comment.user_id
json.parentId comment.parent_id
json.commentableId comment.commentable_id
json.commentableType comment.commentable_type
json.createdAtInt comment.created_at.to_time.to_i
json.createdAtDate comment.created_at.to_date.to_s
