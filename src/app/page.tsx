import HomeWrapper from "./home/homeWrapper";


export async function generateMetadata({ searchParams }: { searchParams: URLSearchParams }) {
  const category = 'Tüm Ürünler';
  const title = `${category} | Store App`;

  return {
    title,
    description: `${category} kategorisindeki ürünleri filtreleyerek ve sıralayarak keşfedin.`,
  };
}

export default function Page() {
  return <HomeWrapper />;
}