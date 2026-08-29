import BasicInfo from "@/components/forms/basic.info";

export default function FormPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <img
        src="https://i.pinimg.com/736x/70/9e/6d/709e6df7069fe51844989923cff5a220.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 w-full max-w-md bg-black p-8">
        <BasicInfo />
      </div>
    </main>
  );
}
