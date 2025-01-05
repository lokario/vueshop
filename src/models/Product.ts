export default class Product {
  id: number;
  name: string;
  resumen: string;
  description: string;
  image?: string | null;
  price: string;
  rating: number;
  punctuation: number;
  categories: string[];

  constructor(data: ProductData) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "Unnamed Product";
    this.resumen = data.resumen ?? "No resumen available";
    this.description = data.description ?? "No description available";
    this.image = data.image?.url ?? null;
    this.price = data.price ?? "0";
    this.rating = data.user?.rating ?? 0;
    this.punctuation = data.user?.punctuation ?? 0;
    this.categories = data.categories ?? [];
  }
}

export type ProductData = Partial<
  Product & {
    image?: { url: string };
    user?: { rating?: number; punctuation?: number };
  }
>;

export const mapProducts = (data: ProductData[]): Product[] => {
  return data.map((item) => new Product(item));
};

export const filterProductsByCategories = (
  products: Product[],
  categories: string[]
): Product[] => {
  return products.filter((product) =>
    product.categories.some((category) => categories.includes(category))
  );
};
