import React from "react";
import { mount } from "../test/enzyme";
import makeAsync from ".";

describe("Make an async component", () => {
  const delay = func => global.setTimeout(func, 1);
  const SomeComponent = props => (
    <div className="SomeComponent">{props.text}</div>
  );
  let consoleError;

  beforeAll(() => {
    consoleError = jest.spyOn(console, "error");
    consoleError.mockImplementation(() => {});
  });

  afterAll(() => {
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it("should display loaded component on success", async () => {
    const Loaded = jest.fn(SomeComponent);
    const resolved = new Promise(resolve => delay(() => resolve(Loaded)));
    const fetchComponent = () => resolved;
    const AsyncComponent = makeAsync(fetchComponent);
    const wrapper = mount(<AsyncComponent text="Some text" />);
    await resolved.then(() => wrapper.update());
    expect(Loaded).toHaveBeenCalledTimes(1);
    expect(Loaded).toHaveBeenCalledWith({ text: "Some text" }, {});
  });

  it("should display nothing on error", async () => {
    const Loaded = jest.fn(SomeComponent);
    const rejected = new Promise((resolve, reject) =>
      delay(() => reject(new Error("Some error")))
    );
    const fetchComponent = () => rejected;
    const AsyncComponent = makeAsync(fetchComponent);
    const wrapper = mount(<AsyncComponent text="Some text" />);
    await rejected.catch(() => wrapper.update());
    expect(Loaded).not.toHaveBeenCalled();
  });
});
