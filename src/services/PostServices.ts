// services/postService.ts
import axiosInstance from "../config/axios.config";
import { Post, Comments } from "../interfaces";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

export const fetchComments = async (): Promise<Comments[]> => {
  const response = await axiosInstance.get("/comments");
  return response.data;
};

export const addPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  const response = await axiosInstance.post("/posts", newPost);
  return response.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await axiosInstance.put(`/posts/${post.id}`, post);
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  await axiosInstance.delete(`/posts/${postId}`);
};
