import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { api } from "@/lib/api";
import handleError from "@/lib/handlers/error";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description:
      "I am new to React and I want to learn it. Can someone suggest me some resources?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn Next.js?",
    description:
      "I am new to Next.js and I want to learn it. Can someone suggest me some resources?",
    tags: [
      { _id: "1", name: "nextjs" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "2",
      name: "John Doe",
      image:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740",
    },
    upvotes: 110,
    answers: 35,
    views: 1030,
    createdAt: new Date("2023-01-01"),
  },
];

const test = async () => {
  try {
    return await api.users.getAll();
  } catch (error) {
    return handleError(error);
  }
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const users = await test();

  console.log(users);

  const { query = "", filter = "" } = await searchParams;

  const filterQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());

    // If there's no filter, just check the title
    if (!filter) return matchesQuery;

    // If there is a filter, check if any tag matches the filter
    const matchesTag = question.tags.some(
      (tag) => tag.name.toLowerCase() === filter.toLowerCase()
    );

    // Return true if both query and tag conditions are met
    return matchesQuery && matchesTag;
  });

  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filterQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
