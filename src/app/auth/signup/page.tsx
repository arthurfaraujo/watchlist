"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import storage from '@/services/databaseService'

// Função para validar a senha usando regex
function validatePassword(password: string): { isValid: boolean; message: string } {
  // Comprimento mínimo de 8 caracteres
  if (password.length < 8) {
    return { isValid: false, message: "A senha deve ter pelo menos 8 caracteres" };
  }

  // Deve conter pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "A senha deve conter pelo menos uma letra maiúscula" };
  }

  // Deve conter pelo menos uma letra minúscula
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: "A senha deve conter pelo menos uma letra minúscula" };
  }

  // Deve conter pelo menos um número
  if (!/\d/.test(password)) {
    return { isValid: false, message: "A senha deve conter pelo menos um número" };
  }

  // Deve conter pelo menos um caractere especial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: "A senha deve conter pelo menos um caractere especial" };
  }

  return { isValid: true, message: "" };
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  // Validação em tempo real quando o campo de senha muda
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Limpa mensagem de erro se o campo estiver vazio
    if (!newPassword) {
      setPasswordError("");
      return;
    }
    
    // Valida a senha
    const validation = validatePassword(newPassword);
    setPasswordError(validation.isValid ? "" : validation.message);
  };

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem");
      return;
    }
    
    // Valida a senha antes de enviar
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setMessage(validation.message);
      return;
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      storage.create({userId: data.user!.id})
      setMessage("Cadastro realizado!");
      router.push("/");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <form
        onSubmit={handleSignup}
        className="bg-neutral-800 p-6 rounded-md flex flex-col gap-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-white text-center">Cadastrar</h2>
        
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-neutral-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <div>
          <input
            type="password"
            placeholder="Senha"
            className={`p-2 rounded bg-neutral-700 text-white w-full ${passwordError ? 'border border-red-500' : ''}`}
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p className="text-sm text-red-400 mt-1">{passwordError}</p>}
        </div>
        
        <input
          type="password"
          placeholder="Confirmar Senha"
          className="p-2 rounded bg-neutral-700 text-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>
        
        {message && <p className="text-sm text-red-400">{message}</p>}
        
        <p className="text-neutral-400 text-sm text-center">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}