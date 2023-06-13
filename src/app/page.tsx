"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    name: "James",
    email: "",
    password: "",
  });

  return (
    <div className="hero h-full bg-base-200">
      <div className="hero-content w-full ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Homepage</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </div>
    </div>
  );
}
