import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Home",
};

const API_URL = "https://billions-api.nomadcoders.workers.dev/";

interface Person {
  id: number;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string;
}

async function getBillionaires() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function Home() {
  const billionaires = await getBillionaires();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 w-[85%] m-auto">
      <h1 className="text-4xl font-bold mb-5">
        Billionaires Around the World{" "}
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {billionaires.map((person: Person) => (
          <Link
            href={`/person/${person.id}/`}
            key={person.id}
            className="my-4 transition duration-150 hover:scale-105"
          >
            {person.squareImage == "https:undefined" ? (
              <div className="w-full aspect-square bg-gray-600 rounded-md" />
            ) : (
              <Image
                src={person.squareImage}
                alt={`Picture of ${person.id}`}
                width={500}
                height={500}
                className="rounded-md"
              />
            )}
            <h3 className="font-semibold text-lg">{person.name}</h3>
            <h4 className="text-sm">
              {Math.floor(person.netWorth / 1000)} Billion / {person.industries}
            </h4>
          </Link>
        ))}
      </div>
    </main>
  );
}
