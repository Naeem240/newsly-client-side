import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const Profile = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const { user, updateUserProfile } = useAuth();

    // Local state for editable fields
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            await updateUserProfile({
                displayName: name,
                photoURL: photoURL,
            });

            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                text: "Your profile information has been updated successfully!",
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong while updating your profile.",
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>My Profile || NewsHub</title>
            </Helmet>
            <div className="px-4 md:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold mb-6 text-center">👤 My Profile</h2>

                <form
                    onSubmit={handleUpdateProfile}
                    className="space-y-4 bg-base-200 shadow p-6 rounded-lg"
                >
                    {/* Email - read only */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-1 font-medium">Photo URL</label>
                        <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Photo preview */}
                    {photoURL && (
                        <div className="mt-4">
                            <p className="mb-2 font-medium">Preview:</p>
                            <img
                                src={photoURL}
                                alt="Profile Preview"
                                className="w-32 h-32 object-cover rounded-full border"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary text-black w-full mt-6">
                        Update Profile
                    </button>
                </form>
            </div>
        </>
    );
};

export default Profile;
