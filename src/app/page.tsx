//redirigir a la pagina de login
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login");
}

