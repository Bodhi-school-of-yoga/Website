// Demo route — renders the SAME composition as the released /yoga-day page so
// there's a single source of truth. See @/components/yoga-day-landing.
import { YogaDayLanding } from "@/components/yoga-day-landing";

export default function YogaDayDemoPage() {
  return <YogaDayLanding />;
}
