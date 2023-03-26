import Header from "../componenets/header";
function WikiPage() {
  const topics = [
    {
      title: "Topic 1",
      description: "Description for Topic 1",
    },
    {
      title: "Topic 2",
      description: "Description for Topic 2",
    },
    {
      title: "Topic 3",
      description: "Description for Topic 3",
    },
    {
      title: "Topic 4",
      description: "Description for Topic 4",
    },
  ];

  return (
    <>
    <Header />
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Wiki</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-lg font-bold mb-2 text-gray-800">{topic.title}</h2>
            <p className="text-gray-600">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default WikiPage;
