import FancyLink from './FancyLink'

export const SectionHeader = ({
    title,
    eyebrow,
    description,
    link,
}: {
    title: string;
    eyebrow: string;
    description: string;
    link?: { href: string; text: string };
}) => {
    return (
        <div className="relative">
            <div className="flex justify-center">
                <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-center bg-clip-text text-transparent">
                 {eyebrow}
                </p>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">
                {title}
            </h2>
            <p className="text-center md:text-lg lg:text-xl text-white/60 mt-4 max-w-md mx-auto">
                {description}
            </p>
            {link && (
                <div className="absolute top-0 right-0 hidden md:block">
                    <FancyLink href={link.href} className="text-sm">
                        {link.text}
                    </FancyLink>
                </div>
            )}
        </div>
    );
};