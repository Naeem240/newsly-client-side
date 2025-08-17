import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CountUp from "react-countup";
import Loading from "../../components/Loading";
import { Slide } from "react-awesome-reveal";

const StatisticsSection = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["userStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/statistics");
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (

        <div className="bg-base-100 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
                📊 Our Community Statistics
            </h2>
            <Slide cascade duration={3000}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center bg-base-200 shadow-md rounded-lg p-6 border-2 border-primary">
                        <h3 className="text-xl font-semibold mb-2">Total Users</h3>
                        <p className="text-4xl font-bold text-blue-600">
                            <CountUp end={stats.total} duration={3} delay={3} />
                        </p>
                    </div>

                    <div className="text-center bg-base-200 shadow-md rounded-lg p-6 border-2 border-primary">
                        <h3 className="text-xl font-semibold mb-2">Normal Users</h3>
                        <p className="text-4xl font-bold text-green-600">
                            <CountUp end={stats.premium} duration={4} />
                        </p>
                    </div>

                    <div className="text-center bg-base-200 shadow-md rounded-lg p-6 border-2 border-primary">
                        <h3 className="text-xl font-semibold mb-2">Premium Users</h3>
                        <p className="text-4xl font-bold text-purple-600">
                            <CountUp end={stats.normal} duration={4} />
                        </p>
                    </div>
                </div>
            </Slide>
        </div>
    );
};

export default StatisticsSection;
