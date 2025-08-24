"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const SearchBox: React.FC<{
  placeholder?: string;
}> = ({ placeholder = "Buscar..." }) => {
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const urlQuery = query ? `?q=${query}` : "";
    router.push(`/posts${urlQuery}`);
  };
  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        placeholder={placeholder}
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl transition-all delay-150 w-100 outline-none"
        name="query"
        value={query}
        onChange={(e) => {
          if (e.target.value) setQuery(e.target.value);
          else {
            setQuery("");
            router.push("/posts");
          }
        }}
        type="search"
      />
      {!query && (
        <svg
          className="size-6 absolute top-3 right-3 text-gray-500"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      )}
    </form>
  );
};

export default SearchBox;
