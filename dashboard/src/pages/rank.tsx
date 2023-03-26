import Header from "../componenets/header";

type Worker = {
    name: string;
    score: number;
    image: string;
  };

function RankingPage() {
    const workers: Worker[] = [
        { name: "Brayek Moetaz", score: 1234, image: "https://media.licdn.com/dms/image/D4E03AQFKzCRlFoRg0A/profile-displayphoto-shrink_800_800/0/1673863851236?e=1685577600&v=beta&t=vb2Rs0J7astTrgaua10Opvec8AkFFpGu0BSuj-XDX1A" },
        { name: "Jane Doe", score: 1000, image: "https://cdn-icons-png.flaticon.com/512/219/219983.png" },
        { name: "Bob Smith", score: 800, image: "https://img.icons8.com/clouds/256/user.png" },
        { name: "Alice Johnson", score: 700, image: "https://img.icons8.com/dusk/256/user.png" },
        { name: "David Lee", score: 600, image: "https://img.icons8.com/carbon-copy/256/user.png" },
      ];

  return (
    <>
    <Header />
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
        <img className="md:w-1/2 object-cover" src="https://cdn-icons-png.flaticon.com/512/983/983865.png" alt="Ranking" />
        <div className="p-6 md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Ranking</h1>
          <ul>
          {workers.map((worker: Worker, index: number) => (
              <li key={index} className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <img className="w-10 h-10 rounded-full mr-4" src={worker.image} alt={worker.name} />
                  <span className={`text-gray-${index + 1 === 1 ? "900" : "700"} font-bold`}>{index + 1}. {worker.name}</span>
                </div>
                <span className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full text-sm`}>{worker.score}</span>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default RankingPage;
