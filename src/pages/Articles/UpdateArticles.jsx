import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Select from "react-select";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePublishers from "../../hooks/usePublishers";
import { uploadImageToImgbb } from "../../utils/imageUpload";

const tagOptions = [
  { value: "politics", label: "Politics" },
  { value: "technology", label: "Technology" },
  { value: "sports", label: "Sports" },
  { value: "health", label: "Health" },
  { value: "finance", label: "Finance" },
];

const UpdateArticles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { publishers } = usePublishers();

  const [article, setArticle] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      setArticle(res.data);
      if (res.data?.tags) {
        const tagsForSelect = res.data.tags.map(tag => ({
          value: tag,
          label: tag.charAt(0).toUpperCase() + tag.slice(1),
        }));
        setSelectedTags(tagsForSelect);
      }
    };

    fetchArticle();
  }, [id, axiosSecure]);

  if (!article) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const publisher = form.publisher.value;
    const imageFile = form.image.files[0];

    let imageUrl = article.image;

    if (imageFile) {
      imageUrl = await uploadImageToImgbb(imageFile);
    }

    const updatedArticle = {
      title,
      description,
      publisher,
      image: imageUrl,
      tags: selectedTags.map(tag => tag.value),
    };

    try {
      const res = await axiosSecure.patch(`/all-articles/${id}`, updatedArticle);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Article updated successfully.",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/my-articles");
      } else {
        Swal.fire("No Change", "No changes were made.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update article.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-2xl font-bold mb-6">✏️ Update Article</h2>
      <form onSubmit={handleSubmit} className="bg-base-200 p-6 rounded shadow space-y-4">
        <input
          name="title"
          type="text"
          required
          defaultValue={article.title}
          className="input input-bordered w-full"
        />

        <img src={article.image} alt="Current" className="w-32 h-32 object-cover rounded" />

        <input
          name="image"
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />

        <select
          name="publisher"
          required
          defaultValue={article.publisher}
          className="select select-bordered w-full"
        >
          <option value="">Select Publisher</option>
          {publishers.map(pub => (
            <option key={pub._id} value={pub.name}>{pub.name}</option>
          ))}
        </select>

        <Select
          isMulti
          options={tagOptions}
          value={selectedTags}
          onChange={setSelectedTags}
          placeholder="Select tags"
          className="text-black"
        />

        <textarea
          name="description"
          required
          defaultValue={article.description}
          className="textarea textarea-bordered w-full"
          rows={5}
        ></textarea>

        <button type="submit" className="btn btn-primary text-black w-full">
          Update Article
        </button>
      </form>
    </div>
  );
};

export default UpdateArticles;
