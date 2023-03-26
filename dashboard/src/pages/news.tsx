import Header from "../componenets/header";
function NewsPage() {
  return (
    <>
    <Header />
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
        <img className="md:w-1/2 object-cover" src="https://pbs.twimg.com/media/FYcdicrXgAAA5rY?format=jpg&name=large" alt="News"  />
        <div className="p-6 md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">We Going Out Sunday</h1>
          <div className="flex items-center mb-4">
            <span className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full text-sm uppercase mr-2">
              Breaking News
            </span>
            <span className="text-gray-700 font-semibold text-sm">3 min ago</span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            
            Dear All Slaves you have a free day at sunday .
            If i see someone coding i kill him .🚀
          </p>
          <div className="flex items-center">
            <img className="w-12 h-12 rounded-full mr-4" src="https://media.licdn.com/dms/image/D4E03AQFKzCRlFoRg0A/profile-displayphoto-shrink_800_800/0/1673863851236?e=1685577600&v=beta&t=vb2Rs0J7astTrgaua10Opvec8AkFFpGu0BSuj-XDX1A" alt="Author" />
            <div className="text-sm">
              <span className="text-gray-900 font-bold">Brayek Moetaz</span>
              <span className="text-gray-600 ml-2 ">Team Lead</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default NewsPage;
