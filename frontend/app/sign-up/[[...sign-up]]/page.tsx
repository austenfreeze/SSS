import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-black p-6">
      <SignUp 
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox: "mx-auto",
            card: "bg-black border border-zinc-900 shadow-none rounded-none w-full max-w-[400px]",
            headerTitle: "text-white text-3xl font-black tracking-tighter italic",
            headerSubtitle: "text-zinc-600 font-mono uppercase tracking-widest text-[9px] mt-2",
            formButtonPrimary: "bg-white text-black hover:bg-zinc-200 transition-all rounded-none text-[10px] uppercase tracking-widest h-12 border-none font-bold mt-4",
            formFieldLabel: "text-zinc-500 font-mono uppercase text-[9px] tracking-widest mb-1",
            formFieldInput: "bg-black border-zinc-800 text-white rounded-none focus:border-white transition-all h-11 px-4 text-sm",
            footerActionText: "text-zinc-700 font-mono text-[9px] uppercase tracking-tighter",
            footerActionLink: "text-zinc-400 hover:text-white transition-colors font-bold ml-1",
            identityPreviewText: "text-white font-mono",
            socialButtonsBlockButton: "bg-black border border-zinc-800 hover:bg-zinc-900 transition-all rounded-none h-11",
            socialButtonsBlockButtonText: "text-[10px] uppercase tracking-widest text-zinc-400",
            dividerLine: "bg-zinc-900",
            dividerText: "text-zinc-800 font-mono text-[9px]",
          }
        }}
      />
    </div>
  );
}