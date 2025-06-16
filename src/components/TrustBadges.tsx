
import { Shield, Star, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
  showStats?: boolean;
}

const TrustBadges = ({ variant = "horizontal", showStats = true }: TrustBadgesProps) => {
  const badges = [
    { icon: Shield, text: "Licensed & Insured", color: "text-blue-600" },
    { icon: Star, text: "Verified Reviews", color: "text-yellow-600" },
    { icon: Clock, text: "24/7 Emergency", color: "text-green-600" },
    { icon: CheckCircle, text: "Background Checked", color: "text-purple-600" }
  ];

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {badges.slice(0, 3).map((badge, index) => (
          <div key={index} className="flex items-center space-x-1 text-gray-600">
            <badge.icon className={`w-4 h-4 ${badge.color}`} />
            <span>{badge.text}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className="space-y-3">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gray-50 ${badge.color}`}>
              <badge.icon className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-900">{badge.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
          <badge.icon className={`w-5 h-5 ${badge.color}`} />
          <span className="text-sm font-medium text-white">{badge.text}</span>
        </div>
      ))}
      {showStats && (
        <Badge className="bg-orange-500 text-white px-4 py-2">
          500+ Verified Contractors
        </Badge>
      )}
    </div>
  );
};

export default TrustBadges;
