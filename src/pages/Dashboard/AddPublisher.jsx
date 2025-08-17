import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { uploadImageToImgbb } from "../../utils/imageUpload";
import { Helmet } from "react-helmet";


const AddPublisher = () => {
  // Jump to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const logoFile = form.logo.files[0];

    try {
      // Upload to imgbb
      const logoUrl = await uploadImageToImgbb(logoFile);

      //console.log(logoUrl);

      // Post to DB
      await axiosSecure.post("/publishers", { name, logo: logoUrl });

      Swal.fire("Success!", "Publisher added successfully.", "success");
      form.reset();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>
        Add Publisher || Admin || NewsHub
      </title>
    </Helmet>
      <div className="max-w-lg mx-auto p-4 mt-10 bg-base-200 shadow rounded">
        <h2 className="text-2xl font-bold mb-6">Add New Publisher</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Publisher Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter publisher name"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none mb-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Publisher Logo:</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none mb-2"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary text-black w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Publisher"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPublisher;
