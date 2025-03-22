import Link from "next/link";

interface TopMenuItemProps {
    title: string;
    href: string;
}

export default function TopMenuItem({title, href}: TopMenuItemProps) {
    return (
        <Link href={href} className="text-xl text-black hover:text-gray-300 transition-colors duration-200">
            {title}
        </Link>
    );
}
