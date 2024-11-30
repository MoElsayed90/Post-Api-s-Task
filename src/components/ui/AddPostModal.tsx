import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoAddCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
interface AddPostModalProps {
  onAddPost: (title: string, body: string) => void;
}
interface FormValues {
  title: string;
  body: string;
}
const AddPostModal: FC<AddPostModalProps> = ({ onAddPost }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: '', body: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onAddPost(data.title, data.body);
    toast.success('Post added successfully!');
    reset();
    (document.getElementById('my_modal_5') as HTMLDialogElement).close();
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById('my_modal_5') as HTMLDialogElement
          ).showModal()
        }
      >
        Add New Post
        <IoAddCircleOutline />
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Post</h3>
          <div className="my-5 space-y-3">
            <input
              type="text"
              placeholder="Post Title"
              className="input input-bordered w-full"
              {...register('title', { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Post Body"
              {...register('body', { required: true })}
            />
            {errors.body && (
              <span className="text-red-500">Body is required</span>
            )}
          </div>
          <div className="modal-action">
            <form
              method="dialog"
              className="space-x-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <button type="submit" className="btn btn-primary px-12">
                Add
              </button>
              <button
                type="button"
                className="btn btn-error px-6"
                onClick={() => {
                  (document.getElementById('my_modal_5') as HTMLDialogElement).close();
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddPostModal;
