import { Product, ProductStore } from "../product";

const store = new ProductStore();

let testProduct: Product = {
  name: "Test Name",
  price: "10.00",
  category: "Test Category",
};

describe("Product Model", () => {
  beforeEach(async () => {
    testProduct = await store.create(testProduct);
  });

  afterEach(async () => {
    await store.delete(testProduct.id as number);
  });

  it("should have index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should have delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create(testProduct);
    expect(result).toEqual(
      jasmine.objectContaining({
        name: testProduct.name,
        price: testProduct.price,
        category: testProduct.category,
      })
    );
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toContain(jasmine.objectContaining(testProduct));
  });

  it("show method should return the correct product", async () => {
    const result = await store.show(testProduct.id as number);
    expect(result).toEqual(testProduct);
  });

  it("update method should update the product", async () => {
    const updatedProduct = {
      ...testProduct,
      name: "Updated Name",
      price: "20.00",
      category: "Updated Category",
    };
    const result = await store.update(testProduct.id as number, updatedProduct);
    expect(result).toEqual(updatedProduct);
  });

  it("delete method should delete the product", async () => {
    await store.delete(testProduct.id as number);
    const result = await store.show(testProduct.id as number);
    expect(result).toBeUndefined();
  });
});
