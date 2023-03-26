import Header from "../componenets/header";
function RoadmapPage() {
  const milestones = [
    {
      title: "Milestone 1",
      description: "Description for Milestone 1",
      status: "done",
    },
    {
      title: "Milestone 2",
      description: "Description for Milestone 2",
      status: "in progress",
    },
    {
      title: "Milestone 3",
      description: "Description for Milestone 3",
      status: "upcoming",
    },
    {
      title: "Milestone 4",
      description: "Description for Milestone 4",
      status: "upcoming",
    },
  ];

  return (
    <>
    <Header />
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Roadmap</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Upcoming</h2>
          {milestones
            .filter((milestone) => milestone.status === "upcoming")
            .map((milestone, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg mb-4 p-6"
              >
                <h3 className="font-bold mb-2">{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            ))}
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <h2 className="text-xl font-bold mb-2">In Progress</h2>
          {milestones
            .filter((milestone) => milestone.status === "in progress")
            .map((milestone, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg mb-4 p-6"
              >
                <h3 className="font-bold mb-2">{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            ))}
          <h2 className="text-xl font-bold mb-2">Done</h2>
          {milestones
            .filter((milestone) => milestone.status === "done")
            .map((milestone, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg mb-4 p-6"
              >
                <h3 className="font-bold mb-2">{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default RoadmapPage;
