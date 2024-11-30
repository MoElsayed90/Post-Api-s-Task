import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ModalEditPostProps {
  post: { id: number; title: string; body: string } | null;
  setEditingPost: React.Dispatch<
    React.SetStateAction<{ id: number; title: string; body: string } | null>
  >;
  handleEditPost: (updatedPost: {
    id: number;
    title: string;
    body: string;
  }) => void;
}
interface FormValues {
  title: string;
  body: string;
}
const ModalEditPost: React.FC<ModalEditPostProps> = ({
  post,
  setEditingPost,
  handleEditPost,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: post ? { title: post.title, body: post.body } : {title:"", body:""},
  });
  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("body", post.body);
    }
  }, [post, setValue]);
  const onSubmit = (data: FormValues) => {
    if (post) {
      const updatedPost = { ...post, title: data.title, body: data.body };
      handleEditPost(updatedPost);
      toast.success("Post updated successfully!");
      reset();
      setEditingPost(null);
      (document.getElementById(`edit_post_modal_${post.id}`) as HTMLDialogElement).close();
    }
  };
  if (!post) return null;
  return (
    <dialog id={`edit_post_modal_${post.id}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Post</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 space-y-3">
            <input
              type="text"
              placeholder="Post Title"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Post Body"
              {...register("body", { required: true })}
            />
            {errors.body && (
              <span className="text-red-500">Body is required</span>
            )}
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary px-12">
              Save
            </button>
            <button
              type="button"
              className="btn btn-error px-6"
              onClick={() => {
                (document.getElementById(`edit_post_modal_${post.id}`) as HTMLDialogElement).close();
                reset(); 
                setEditingPost(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
export default ModalEditPost;
