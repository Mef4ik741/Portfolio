import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import watermarkLogo from "../pngs/Logo ITB.png";

type Props = {
  locale: "en" | "ru" | "az";
};

export default async function ItBerriesSection({ locale }: Props) {
  const t = await getTranslations({ locale });

  return (
    <section className="relative overflow-hidden bg-[#1A1A1A] px-10 py-10">
      <div className="relative z-10 max-w-[720px]">
        <h2 className="text-sm font-semibold tracking-[0.35em] text-white">
          {t("itBerries.title")}
        </h2>
        <p className="mt-6 text-xs leading-6 text-white/65">
          Nulla in velit a metus rhoncus tempus. Nulla congue nulla vel sem varius
          finibus. Sed ornare sit amet lorem sed viverra. In vel urna quis libero
          viverra facilisis ut ac est. Morbi commodo, eros in dignissim tempus,
          lacus odio rutrum augue, in semper sem magna quis tellus. Etiam enim
          erat, suscipit eu semper a, dictum sit amet elit. Nunc egestas nisi eget
          enim gravida facilisis.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <span className="h-px w-10 bg-white/40" />
          <Link
            className="text-[11px] font-semibold tracking-[0.2em] text-white/80 transition-colors hover:text-white"
            href="/portfolio"
          >
            {t("itBerries.readMore")}
          </Link>
          <span className="h-px w-10 bg-white/40" />
        </div>
      </div>

      <div className="pointer-events-none absolute -right-24 -bottom-48 opacity-20">
        <Image src={watermarkLogo} alt="" width={520} height={520} />
      </div>
    </section>
  );
}
