import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allReviews,
    refetch: refetchAllReviews,
    isLoading,
  } = useQuery({
    queryKey: ["allReviewsAdminQuery"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allReviews`);
      return res.data;
    },
    enabled: !!localStorage.getItem("access-token"),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosSecure.delete(`/myReviews/delete/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error deleting review: ${error.message}`);
      }
    },
    onError: (error) => {
      console.error(error.message);
    },
    onSuccess: () => {
      console.log("Review deleted successfully");
      refetchAllReviews();
    },
  });

  const handleDelete = (id) => {
    deleteReviewMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <span className="size-80 loading loading-ball loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-center w-full py-[35px]">
        <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold">
          Manage Reviews
        </h2>
        <div className="w-[40%] pb-[30px] mx-auto mb-4">
          <hr />
        </div>
      </div>

      {allReviews?.length > 0 ? (
        <div className="w-full flex flex-col items-center">
          {allReviews.map((review) => (
            <div
              className="bg-white shadow-2xl rounded-lg w-full max-w-4xl p-6 m-2"
              key={review._id}
            >
              <div className="flex justify-between">


<div>
                  <p className="text-gray-800">
                    Reviewer Email: {review.ReviewerEmail}
                  </p>
                  <p className="text-gray-800">
                    Reviewer Name: {review.ReviewerName}
                  </p>
                  <p className="text-gray-800">
                    Review Description: {review.Review}
                  </p>
                  <button
                    className="btn btn-sm bg-black text-white"
                    onClick={() => {
                      handleDelete(review._id);
                    }}
                  >
                    Delete
                  </button>
</div>

<div>
                  <div title="Reviewer Profile" className="avatar pl-2 pt-1">
                    <div className="w-20 rounded-md mask mask-squire">
                      <img src={review.ReviewerImage} />
                    </div>
                  </div>
                  <div className="pl-2 text-gray-400">Reviewer Image</div>
</div>





              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No review found</div>
      )}
    </div>
  );
};

export default ManageReviews;
