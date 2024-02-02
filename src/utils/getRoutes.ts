import { ActiveType } from "@prisma/client";

export const getRoutes = ({
  active,
}: {
  active: ActiveType | null;
}): { title: string; href: string }[] => {
  if (!active) return [];
  else if (active === ActiveType.NONE) {
    return [
      { title: "Become a Founder", href: "/founder/new" },
      { title: "Become an Investor", href: "/investor/new" },
    ];
  } else if (active === ActiveType.FOUNDER) {
    return [
      { title: "Create Venture", href: "/investment/new" },
      { title: "My Ventures", href: "/founder/investments" },
    ];
  } else {
    return [{ title: "My Jobs ", href: "/investor/jobs" }];
  }
};
