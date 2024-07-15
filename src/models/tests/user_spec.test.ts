import { matchPassword } from "../../utils/hashing";
import { User, NewUser, UserStore } from "../user";

const store = new UserStore();

const newTestUser: NewUser = {
  first_name: "Test",
  last_name: "User",
  password: "12345",
};
let testUser: User;

describe("User Model", () => {
  beforeEach(async () => {
    testUser = await store.create(newTestUser);
  });

  afterEach(async () => {
    const testUserExists = await store.show(testUser.id as number);
    if (testUserExists != undefined) await store.delete(testUser.id as number);
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

  it("should have delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await store.create(newTestUser);
    
    expect(result).toEqual(
      jasmine.objectContaining({
        first_name: testUser.first_name,
        last_name: testUser.last_name,
      })
    );
  });

  it("create method should hash password", async () => {
    const result = await store.create(newTestUser);
    
    expect(matchPassword(newTestUser.password, result.password_digest)).toBeTruthy();
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toContain(jasmine.objectContaining(testUser));
  });

  it("show method should return the correct user", async () => {
    const result = await store.show(testUser.id as number);
    expect(result).toEqual(testUser);
  });

  it("update method should update the user", async () => {
    const updatedUser: NewUser = {
      id: testUser.id,
      first_name: "NewJane",
      last_name: "NewDoe",
      password: "newpassword123",
    };

    const result = await store.update(updatedUser.id as number, updatedUser);
    expect(result).toEqual(
      jasmine.objectContaining({
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
      })
    );
  });

  it("delete method should remove the user", async () => {
    await store.delete(testUser.id as number);
    const result = await store.show(testUser.id as number);
    expect(result).toBeUndefined();
  });
});
