import articles from "../data/articles.json";

export default function Blog() {
  return (
    <div>
      <div className="flex w-full flex-col flex-wrap md:flex-row">
        {articles.map((article) => (
          <div
            key={article.id}
            className="grid grid-flow-row gap-4 md:w-[50%] md:grid-flow-col"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-[150px] w-full rounded-md !object-cover
              md:w-[200px]"
            />
            <div className="w-full md:max-w-[300px]">
              <a className="text-md font-semibold">{article.title}</a>
              <p className="mt-2 text-sm">{article.description}</p>
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
}
