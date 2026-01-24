import Layout from "@/components/Layout";
import ListingCard, { Listing } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function BusinessForSale() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetch('/listings.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch listings');
        return res.json();
      })
      .then(data => {
        // Filter only "生意转让" category
        const businessListings = data.filter((item: Listing) => item.category === "生意转让");
        setListings(businessListings);
      })
      .catch(err => console.error("Failed to load listings", err));
  }, []);

  // Extract unique locations for filter
  const locations = useMemo(() => {
    const locs = new Set(listings.map(l => l.location.split('(')[0].trim()));
    return Array.from(locs).sort();
  }, [listings]);

  // Filter logic
  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      // Search query
      const matchesSearch = 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = locationFilter === "all" || listing.location.includes(locationFilter);

      // Price filter
      let matchesPrice = true;
      const price = parseInt(listing.price.replace(/[^0-9]/g, ''));
      
      if (priceFilter === "under-100k") matchesPrice = price < 100000;
      else if (priceFilter === "100k-200k") matchesPrice = price >= 100000 && price <= 200000;
      else if (priceFilter === "over-200k") matchesPrice = price > 200000;

      return matchesSearch && matchesLocation && matchesPrice;
    });
  }, [listings, searchQuery, locationFilter, priceFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("all");
    setPriceFilter("all");
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-muted/30 py-12 border-b border-border">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">生意转让</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            精选洛杉矶优质生意资源，助您轻松开启创业之路。
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="搜索生意、区域或关键词..." 
                className="pl-9 bg-muted/50 border-border/50 focus:bg-background transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <Button 
                variant="outline" 
                size="sm" 
                className="md:hidden flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal className="w-4 h-4" /> 筛选
              </Button>

              <div className={`
                ${isFilterOpen ? 'flex' : 'hidden'} 
                md:flex flex-col md:flex-row gap-2 absolute md:static top-full left-0 right-0 bg-background p-4 md:p-0 border-b md:border-0 border-border shadow-lg md:shadow-none z-40
              `}>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="选择区域" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有区域</SelectItem>
                    {locations.map(loc => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="价格范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有价格</SelectItem>
                    <SelectItem value="under-100k">$10万以下</SelectItem>
                    <SelectItem value="100k-200k">$10万 - $20万</SelectItem>
                    <SelectItem value="over-200k">$20万以上</SelectItem>
                  </SelectContent>
                </Select>

                {(searchQuery || locationFilter !== "all" || priceFilter !== "all") && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4 mr-1" /> 清除
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="container py-12">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.listing_id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">未找到相关房源</h3>
            <p className="text-muted-foreground mb-6">
              请尝试调整筛选条件或搜索关键词。
            </p>
            <Button onClick={clearFilters}>清除所有筛选</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
