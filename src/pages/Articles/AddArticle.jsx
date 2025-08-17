import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import usePublishers from "../../hooks/usePublishers";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { uploadImageToImgbb } from "../../utils/imageUpload";
import useAuth from '../../hooks/useAuth';
import { Helmet } from "react-helmet";

const tagOptions = [
  { value: "politics", label: "Politics" },
  { value: "technology", label: "Technology" },
  { value: "sports", label: "Sports" },
  { value: "health", label: "Health" },
  { value: "finance", label: "Finance" },
  { value: "others", label: "Others" }, // ✅ Add Others
];


const AddArticle = () => {
  // Jump to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [customTag, setCustomTag] = useState("");


  const { publishers } = usePublishers();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const publisher = form.publisher.value;
    const imageFile = form.image.files[0];
    const tags = selectedTags.map(tag => tag.value).filter(tag => tag !== "others");
    if (customTag) {
      tags.push(customTag.trim());
    }

    if (customTag.includes(" ")) {
      setLoading(false);
      return Swal.fire("Error", "Custom tag must be a single word.", "error");
    }

    if (!imageFile) {
      setLoading(false);
      return Swal.fire("Error", "Please select an image", "error");
    }

    try {
      const imageUrl = await uploadImageToImgbb(imageFile);

      const newArticle = {
        title,
        description,
        image: imageUrl,
        publisher,
        tags,
        authorName: user.displayName,
        authorEmail: user.email,
        authorPhoto: user.photoURL,
        postedDate: new Date(),
        status: "pending",
        isPremium: false,
        views: 0,
      };

      const res = await axiosSecure.post('/all-articles', newArticle);

      if (res.data.allowed === false) {
        Swal.fire({
          icon: "error",
          title: "Limit Reached",
          text: "As a normal user you can only publish 1 article. Upgrade to premium to post unlimited articles.",
        });
      } else if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your article has been submitted and is pending admin approval.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        form.reset();
        setSelectedTags([]);
      } else {
        Swal.fire("Error", "Failed to submit article.", "error");
      }

    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Add Article || NewsHub</title>
    </Helmet>
    <div className="px-4 md:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">📝 Add New Article</h2>
      <form onSubmit={handleSubmit} className="bg-base-200 p-6 rounded shadow space-y-4">
        <input name="title" type="text" required placeholder="Article Title" className="input input-bordered w-full" />

        <input name="image" type="file" accept="image/*" required className="file-input file-input-bordered w-full" />

        <select name="publisher" required className="select select-bordered w-full">
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
        {selectedTags.some(tag => tag.value === "others") && (
          <input
            type="text"
            placeholder="Enter custom tag (one word)"
            className="input input-bordered w-full"
            value={customTag}
            onChange={e => setCustomTag(e.target.value)}
          />
        )}


        <textarea
          name="description"
          required
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          rows={5}
        ></textarea>

        <button
          type="submit"
          className="btn btn-primary text-black w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Article"}
        </button>
      </form>
    </div>
    </>
  );
};

export default AddArticle;
