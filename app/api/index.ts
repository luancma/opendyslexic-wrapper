import pb from "../libs/pocketbase";

export const getListOfBooks = async () => {
  const resultList = await pb.collection("search_books").getList(1, 50);
  return resultList;
};

export const saveBook = async ({
  url,
  title,
}: {
  url: string;
  title: string;
}) => {
  const result = await pb.collection("search_books").create({
    url,
    title,
  })
  return result;
};
