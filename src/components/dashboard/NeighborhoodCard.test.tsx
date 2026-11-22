import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NeighborhoodCard from "./NeighborhoodCard";
import type { EvaluatedNeighborhood } from "@/lib/types";

const base: EvaluatedNeighborhood = {
  id: 7,
  name: "Koramangala",
  city: "Bengaluru",
  data: "Sample",
  image: "https://placehold.co/600x400.png",
  avgRent: 35000,
  walkScore: 85,
  amenities: ["parks", "schools"],
  matchScore: 0,
  explanation: "",
};

describe("NeighborhoodCard", () => {
  it("links to the detail page and shows the basics", () => {
    render(<NeighborhoodCard neighborhood={base} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/neighborhood/7");
    expect(screen.getByRole("heading", { name: "Koramangala" })).toBeInTheDocument();
    expect(screen.getByText("85/100")).toBeInTheDocument();
    expect(screen.getByText("Good")).toBeInTheDocument();
  });

  it("hides the score until the neighborhood has been scored", () => {
    render(<NeighborhoodCard neighborhood={base} />);
    expect(screen.queryByText("match")).not.toBeInTheDocument();
  });

  it("shows the score and explanation once scored", () => {
    render(
      <NeighborhoodCard
        neighborhood={{ ...base, matchScore: 82, explanation: "Close to parks and the metro." }}
      />
    );
    expect(screen.getByText("82%")).toBeInTheDocument();
    expect(screen.getByText("Close to parks and the metro.")).toBeInTheDocument();
  });
});
