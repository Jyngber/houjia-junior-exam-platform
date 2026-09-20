"use client";
import { useEffect } from "react";
import { signOut } from "@/lib/auth/client";
export default function LogoutPage(){useEffect(()=>{signOut().finally(()=>{window.location.href="/auth";});},[]);return <main className="p-8">登出中...</main>;}