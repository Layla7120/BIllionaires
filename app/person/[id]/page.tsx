import Image from "next/image";

const API_URL = " https://billions-api.nomadcoders.workers.dev/person/";

export interface Root {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

export interface FinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number;
}

async function getBillionaireDetail(id: string) {
  const response = await fetch(API_URL + id);
  const json = await response.json();
  return json;
}

export default async function Person_Id({
  params: { id },
}: {
  params: { id: string };
}) {
  const details = await getBillionaireDetail(id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="m-auto my-10 p-10 w-[80%] bg-gray-800">
        {details.squareImage == "https:undefined" ? (
          <div className="w-[300px] aspect-square bg-gray-600 rounded-md" />
        ) : (
          <Image
            src={details.squareImage}
            alt={`Picture of ${details.id}`}
            width={300}
            height={300}
            className="rounded-md"
          />
        )}
        <h1 className="text-2xl my-3 font-bold">{details.name}</h1>
        <p className="my-2">
          Networth : {Math.floor(details.netWorth / 1000)} Billion
        </p>
        <p className="my-2">Country : {details.country}</p>
        <p className="my-2">Industry : {details.industries}</p>
        <p className="my-2">{details.bio} </p>
      </div>
      <div className="m-auto p-10 mb-20 w-[80%] bg-gray-800">
        <h2 className="text-2xl">Financial Assets</h2>
        <div className="grid grid-cols-4 my-3 gap-3">
          {details.financialAssets.map((asset: FinancialAsset) => (
            <div
              key={asset.companyName}
              className="border border-zinc-500 rounded-md p-3"
            >
              <p className="font-bold">Ticker : {asset.ticker}</p>
              <p className="font-bold">
                Shares : {asset.numberOfShares.toLocaleString()}
              </p>
              {asset.exerciseOptionPrice ? (
                <p className="font-bold">
                  Exercise price : ${asset.exerciseOptionPrice}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
