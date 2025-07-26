import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Full-Stack Developer",
          "C# & .NET Expert",
          "Angular Developer",
          "Azure Cloud Specialist",
          "Mobile Developer (Flutter)",
          "Database Engineer",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
