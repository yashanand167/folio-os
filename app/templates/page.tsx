import FloatingBar from "@/components/customs/floating-bar";
import MinimalPage from "@/components/templates/minimal/pages/home";

export default function Templates() {
  return (
    <div className="relative min-h-screen bg-white">
      <MinimalPage />
      <FloatingBar />
    </div>
  );
}
