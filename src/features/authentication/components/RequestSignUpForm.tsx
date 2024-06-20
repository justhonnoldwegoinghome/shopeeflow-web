import { useState } from "react";

import { useRequestSignUp } from "../api/requestSignUp";

export function RequestSignUpForm() {
  const requestSignUpMutation = useRequestSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        requestSignUpMutation.trigger({ data: { email, password } });
      }}
    >
      <input
        type="text"
        placeholder="Email"
        className="block border border-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block border border-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
