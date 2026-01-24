import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export interface Listing {
  listing_id: string;
  category: string;
  title: string;
  price: string;
  location: string;
  highlights: string[];
  description: string;
  images: string[];
  is_success_story: boolean;
}

interface ListingCardProps {
  listing: Listing;
  className?: string;
}

export default function ListingCard({ listing, className }: ListingCardProps) {
  // Use the first image or a placeholder
  const coverImage = listing.images && listing.images.length > 0 
    ? `/assets/images/${listing.images[0]}` 
    : "/images/business-cover.jpg";

  return (
    <Link href={`/listing/${listing.listing_id}`}>
      <Card className={cn("group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col bg-card", className)}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img 
            src={coverImage} 
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // Fallback to category cover if specific image fails
              const target = e.target as HTMLImageElement;
              if (listing.category.includes("生意")) target.src = "/images/business-cover.jpg";
              else if (listing.category.includes("工业")) target.src = "/images/industrial-cover.jpg";
              else if (listing.category.includes("办公")) target.src = "/images/office-cover.jpg";
              else target.src = "/images/home-banner.jpg";
            }}
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="font-medium shadow-sm backdrop-blur-sm bg-white/90 text-primary hover:bg-white">
              {listing.category}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-medium flex items-center gap-1">
              查看详情 <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
        
        <CardHeader className="p-5 pb-2 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>
        </CardHeader>
        
        <CardContent className="p-5 pt-2 pb-4 flex-grow">
          <div className="flex flex-wrap gap-1.5 mt-2">
            {listing.highlights.slice(0, 3).map((highlight, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground"
              >
                {highlight}
              </span>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0 border-t border-border/30 mt-auto flex items-center justify-between bg-muted/10">
          <div className="flex items-center text-primary font-bold text-lg">
            {listing.price}
          </div>
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            ID: {listing.listing_id}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
