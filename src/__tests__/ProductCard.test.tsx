/// <reference types="vitest" />
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const product = {
  id: 1,
  title: "Test Product",
  price: 100,
  discountedPrice: 80,
  rating: 4,
  image: { url: "https://example.com/image.jpg", alt: "Test image" },
  description: "A nice test product",
};

describe("ProductCard", () => {
  it("renders the product title", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Test Product/i).length).toBeGreaterThan(0);
  });

  it("shows discounted and original price", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    expect(
      screen.getByText((content) => content.includes("80"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("100"))
    ).toBeInTheDocument();
  });

  it("shows the discount percentage", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    expect(screen.getByText(/-20%/)).toBeInTheDocument();
  });
});
