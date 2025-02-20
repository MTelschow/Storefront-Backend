import { Order, OrderStore } from "../order";
import { NewUser, User, UserStore } from "../user";

const store = new OrderStore();

const userStore = new UserStore();

let testOrder: Order = {
  user_id: NaN,
  status: "active",
};

const newTestUser: NewUser = {
  first_name: "John",
  last_name: "Doe",
  password: "password123",
};

let testUser: User;

describe("Order Model", () => {
  beforeAll(async () => {
    testUser = await userStore.create(newTestUser);
    testOrder.user_id = testUser.id as number;
  });

  beforeEach(async () => {
    testOrder = await store.create(testOrder);
  });

  afterEach(async () => {
    const testOrderExists = await store.delete(testOrder.id as number);
    if (testOrderExists != undefined)
      await store.delete(testOrder.id as number);
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

  it("create method should add an order", async () => {
    const result = await store.create({
      user_id: testUser.id as number,
      status: "active",
    });

    expect(result).toEqual(
      jasmine.objectContaining({
        user_id: testUser.id,
        status: "active",
      })
    );
  });

  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toContain(jasmine.objectContaining(testOrder));
  });

  it("show method should return the correct order", async () => {
    const result = await store.show(testOrder.id as number);
    expect(result).toEqual(testOrder);
  });

  it("update method should update the order", async () => {
    const updatedOrder: Order = {
      id: testOrder.id,
      user_id: testOrder.user_id,
      status: "complete",
    };

    const result = await store.update(testOrder.id as number, updatedOrder);
    expect(result).toEqual(updatedOrder);
  });

  it("delete method should remove the order", async () => {
    await store.delete(testOrder.id as number);
    const result = await store.show(testOrder.id as number);
    expect(result).toBeUndefined();
  });
});
