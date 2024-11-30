import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Comments, Post } from "@interfaces/index";
import {
  addPost,
  deletePost,
  fetchComments,
  fetchPosts,
  updatePost,
} from "../services/PostServices";
import SearchInput from "@components/ui/SearchInput";
import AddPostModal from "@components/ui/AddPostModal";
import ModalEditPost from "@components/ui/ModalEditPost";
import { toast } from "react-toastify";
import { MdDelete, MdEdit, MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [, setComments] = useState<Comments[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        const fetchedComments = await fetchComments();
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data.");
      }
    };
    loadData();
  }, []);

  const handleSearchInput = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const handleAddPost = async (title: string, body: string) => {
    try {
      const newPost = { id: uuidv4(), title, body }; // Use uuidv4() for unique ID
      const addedPost = await addPost(newPost);
      setPosts([addedPost, ...posts]);
      toast.success("Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Failed to add post.");
    }
  };

  const handleEditPost = async (updatedPost: Post) => {
    try {
      const response = await updatePost(updatedPost);
      setPosts(
        posts.map((post) => (post.id === response.id ? response : post))
      );
      toast.success("Post edited successfully!");
    } catch (error) {
      console.error("Error editing post:", error);
      toast.error("Failed to edit post.");
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post.");
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredPosts.length / postsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setTimeout(() => {
      (document.getElementById(`edit_post_modal_${post.id}`) as HTMLDialogElement).showModal();
    }, 0);
  };

  return (
    <div className="container">
      <SearchInput onSearch={handleSearchInput} />
      <div className="flex justify-end my-4">
        <AddPostModal onAddPost={handleAddPost} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id} className="hover">
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td className="space-x-2">

                <button
                  className="btn btn-sm btn-outline px-5"
                  onClick={() => openEditModal(post)}
                  >
                  Edit
                  <MdEdit />
                </button>
                <button
                  className="btn btn-sm btn-error px-5"
                  onClick={() => handleDeletePost(post.id)}
                  >
                  Delete
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="join grid grid-cols-2 mx-20 space-x-2 my-3">
        <button
          className="join-item btn btn-outline disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <MdOutlineNavigateBefore />
          Previous
        </button>
        <button
          className="join-item btn btn-outline disabled:cursor-not-allowed"
          disabled={
            currentPage === Math.ceil(filteredPosts.length / postsPerPage)
          }
          onClick={() => paginate(currentPage + 1)}
        >
          Next
          <MdOutlineNavigateNext />

        </button>
      </div>
      {editingPost && (
        <ModalEditPost
          post={editingPost}
          setEditingPost={setEditingPost}
          handleEditPost={handleEditPost}
        />
      )}
    </div>
  );
};

export default Posts;
