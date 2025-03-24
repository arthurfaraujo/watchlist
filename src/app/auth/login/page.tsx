"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage("Login realizado com sucesso!");
      router.push("/");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-800 p-6 rounded-md flex flex-col gap-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-white text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-neutral-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded bg-neutral-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Entrar
        </button>
        {message && <p className="text-sm text-red-400">{message}</p>}
        
        <p className="text-neutral-400 text-sm text-center">
          Não tem uma conta?{" "}
          <Link href="/auth/signup" className="text-blue-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}