import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { apiResponse, handleApiError } from "helpers";
import { PrismaCourseOutput } from "types";

export interface SearchParams {
  params: {
    query: string;
  };
}

interface SearchBody {
  cursor: number | null
  toGet: number
  pageNo: number
}

export async function POST(req: Request, { params }: SearchParams): Promise<Response> {
  try {
    const query = params.query;
    const body: SearchBody = await req.json()

    if (typeof query !== "string") {
      throw new Error("Invalid Request");
    }
    const cursor = body.cursor
    const { toGet, pageNo } = body
    const toSkip = (pageNo - 1) * toGet

    // await checkAndSendCachedData(query, pageNo)

    const searchResult = await getSearchResults(query, toSkip, toGet);
    const totalResults = await getNumberOfAllResults(query)

    // await redis.set(`coursesFor${query}${pageNo}`, JSON.stringify({ searchResult }))
    // await redis.set(`totalResultsFor${query}`, JSON.stringify({ totalResults }))

    if (searchResult.length === 0 || !searchResult) {
      console.log(`No courses found for keyword: ${query}`);
      return apiResponse({ message: "Search didn't match any courses." });
    }
    return apiResponse({ data: { courses: searchResult, totalResults: totalResults } });
  } catch (error) {
    return handleApiError(error);
  }
}

const checkAndSendCachedData = async (query: string, pageNo: number) => {
  const searchResult: PrismaCourseOutput<{ select: {}, include: {} }>[] = JSON.parse(await redis.get(`coursesFor${query}${pageNo}`) as string)
  const totalResults: number = JSON.parse(await redis.get(`totalResultsFor${query}`) as string)
   
  if (searchResult && totalResults) {
    return apiResponse({data: { courses: searchResult, totalResults: totalResults }});
  }
}

const getSearchResults = async (query: string, toSkip: number, toGet: number) => {
  const searchTerm = query.split(' ').map((word) => `${word}:*`).join(' & ');
  console.log(searchTerm)
  const unique = query.split(' ').toString()
  const searchResult = await prisma.course.findMany({
    where: {
      OR: [
        {
          title: {
            search: searchTerm, mode: "insensitive"
          },
        },
        {
          description: {
            search: searchTerm, mode: "insensitive"
          },
        },
        {
          category: {
            hasSome: [searchTerm.toLowerCase(), unique.toLowerCase(), query.toLowerCase()]
          },
        },
      ],
    },
    orderBy: {
      id: "asc"
    },
    include:{admin:true},
    take: toGet,
    skip: toSkip,
  });

  return searchResult;
}

const getNumberOfAllResults = async (query: string) => {
  const searchTerm = query.split(' ').map((word) => `${word}:*`).join(' & ');
  const unique = query.split(' ').toString()
  const totalResults = await prisma.course.count({
    where: {
      OR: [
        {
          title: {
            search: searchTerm, mode: "insensitive"
          },
        },
        {
          description: {
            search: searchTerm, mode: "insensitive"
          },
        },
        {
          category: {
            hasSome: [searchTerm.toLowerCase(), unique.toLowerCase(), query.toLowerCase()]
          },
        },
      ],
    }
  });

  return totalResults;
}