import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function FloatingHeader() {
    return (
        <header className="fixed top-10 right-10">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-black">
                    <Link href="/">
                        <HomeIcon className="w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </header>
    )
}