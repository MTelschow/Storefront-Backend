import { OrderItem, OrderItemStore } from "../order_item";
import { Order, OrderStore } from "../order";
import { User, UserStore } from "../user";
import { Product, ProductStore } from "../product";

const store = new OrderItemStore();
const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

let testOrderItem: OrderItem = {
  order_id: NaN,
  product_id: NaN,
  quantity: 15,
};

let testOrder: Order = {
  user_id: NaN,
  status: "active",
};

let testUser: User = {
  first_name: "John",
  last_name: "Doe",
  password_digest: "password123",
};

let testProduct: Product = {
  name: "Test Name",
  price: "10.00",
  category: "Test Category",
};

describe("Order Item Model", () => {
  beforeAll(async () => {
    testProduct = await productStore.create(testProduct);
    testUser = await userStore.create(testUser);
    testOrder.user_id = testUser.id as number;
    testOrder = await orderStore.create(testOrder);

    testOrderItem.order_id = testOrder.id as number;
    testOrderItem.product_id = testProduct.id as number;
  });

  beforeEach(async () => {
    testOrderItem = await store.create(testOrderItem);
  });

  afterEach(async () => {
    const testOrderItemExists = await store.show(testOrderItem.id as number);
    if (testOrderItemExists != undefined)
      await store.delete(testOrderItem.id as number);
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

  it("create method should create a new order item", async () => {
    const newOrderItem: OrderItem = {
      order_id: testOrder.id as number,
      product_id: testProduct.id as number,
      quantity: 5,
    };

    const createdOrderItem = await store.create(newOrderItem);

    expect(createdOrderItem).toEqual(jasmine.objectContaining(newOrderItem));
  });

  it("index method should return a list of order items", async () => {
    const result = await store.index();
    expect(result).toContain(jasmine.objectContaining(testOrderItem));
  });

  it("show method should return the correct order item", async () => {
    const result = await store.show(testOrderItem.id as number);
    expect(result).toEqual(testOrderItem);
  });

  it("update method should update the order item", async () => {
    const updatedOrderItem = {
      ...testOrderItem,
      quantity: 35,
    };
    const result = await store.update(
      testOrderItem.id as number,
      updatedOrderItem
    );
    expect(result).toEqual(updatedOrderItem);
  });

  it("delete method should delete the order item", async () => {
    await store.delete(testOrderItem.id as number);
    const result = await store.show(testOrderItem.id as number);
    expect(result).toBeUndefined();
  });
});
