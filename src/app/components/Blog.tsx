import articles from "../data/articles.json";

export default function Blog() {
  return (
    <div>
      <div className="grid w-full grid-flow-row md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="grid grid-flow-row bg-white rounded shadow p-4 gap-4  md:grid-flow-col"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-[150px] w-full rounded-md !object-cover
              md:w-[150px]"
            />
            <div className="w-full md:max-w-1/2">
              <a className="text-md font-semibold">{article.title}</a>
              <p className="mt-2 text-sm">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
