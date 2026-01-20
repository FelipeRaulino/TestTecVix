import React from "react";
import { it, expect, describe, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Searchbar } from "../../../src/pages/Home/components/Header/Searchbar";
import "@testing-library/jest-dom/vitest";
import "../../mocks/i18nForTests";

// Mock do i18next para internacionalização nos testes
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Retorna a chave de tradução
  }),
  initReactI18next: { type: "3rdParty", init: () => { } }, // Mock de initReactI18next
}));

describe("Searchbar Component", () => {
  it("should update the search input when typing", () => {
    const { getByPlaceholderText } = render(<Searchbar />);

    // Ajuste o placeholder para o valor internacionalizado ("home.search")
    const input = getByPlaceholderText("home.search") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test search" } });

    expect(input.value).toBe("Test search");
  });




});
