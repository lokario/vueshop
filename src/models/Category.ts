export default class Category {
  id: number;
  uuid: string;
  name: string;
  image: string;
  description: string;

  constructor(data: Partial<Category>) {
    this.id = data.id!;
    this.uuid = data.uuid!;
    this.name = data.name!;
    this.image = data.image!;
    this.description = data.description!;
  }
}

export const mapCategories = (data: Category[]): Category[] => {
  return data.map((item) => new Category(item));
};
