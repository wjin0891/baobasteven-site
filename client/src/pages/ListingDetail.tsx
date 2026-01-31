import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin, DollarSign, CheckCircle2, ArrowLeft, Share2, Phone, Mail } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState, useEffect } from "react";
import { Listing } from "@/components/ListingCard";

export default function ListingDetail() {
  const [, params] = useRoute("/listing/:id");
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    fetch('/listings.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch listings');
        return res.json();
      })
      .then(data => {
        const found = data.find((item: Listing) => item.listing_id === params.id);
        setListing(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load listing", err);
        setLoading(false);
      });
  }, [params?.id]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
            <div className="h-96 bg-muted rounded w-full"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!listing) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">未找到该房源</h1>
          <Link href="/business-for-sale">
            <Button>返回列表</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb & Actions */}
      <div className="bg-muted/30 border-b border-border py-4">
        <div className="container flex items-center justify-between">
          <Link href="/business-for-sale">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary pl-0">
              <ArrowLeft className="w-4 h-4 mr-2" /> 返回列表
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Share2 className="w-4 h-4 mr-2" /> 分享
          </Button>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Images & Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location (Mobile only) */}
            <div className="lg:hidden space-y-4">
              <Badge variant="secondary" className="mb-2">{listing.category}</Badge>
              <h1 className="text-2xl font-bold leading-tight">{listing.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1 shrink-0" />
                <span>{listing.location}</span>
              </div>
              <div className="text-2xl font-bold text-primary">{listing.price}</div>
            </div>

            {/* Image Carousel */}
            <div className="rounded-xl overflow-hidden border border-border bg-muted">
              <Carousel className="w-full">
                <CarouselContent>
                  {listing.images && listing.images.length > 0 ? (
                    listing.images.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-video relative">
                          <img 
                            src={img} 
                            alt={`${listing.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (listing.category.includes("生意")) target.src = "/images/business-cover.jpg";
                              else if (listing.category.includes("工业")) target.src = "/images/industrial-cover.jpg";
                              else if (listing.category.includes("办公")) target.src = "/images/office-cover.jpg";
                              else target.src = "/images/home-banner.jpg";
                            }}
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="aspect-video relative bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">暂无图片</span>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                {listing.images && listing.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </>
                )}
              </Carousel>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-border pb-4">项目详情</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p>{listing.description}</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-border pb-4">核心亮点</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Desktop Title & Price */}
              <div className="hidden lg:block space-y-4 p-6 rounded-xl border border-border bg-card shadow-sm">
                <Badge variant="secondary" className="mb-2">{listing.category}</Badge>
                <h1 className="text-2xl font-bold leading-tight">{listing.title}</h1>
                <div className="flex items-center text-muted-foreground text-sm border-b border-border pb-4">
                  <MapPin className="w-4 h-4 mr-1 shrink-0" />
                  <span>{listing.location}</span>
                </div>
                <div className="pt-2">
                  <div className="text-sm text-muted-foreground mb-1">售价</div>
                  <div className="text-3xl font-bold text-primary">{listing.price}</div>
                </div>
              </div>

              {/* Contact Card */}
              <Card className="border-primary/20 shadow-md overflow-hidden">
                <div className="bg-primary p-4 text-primary-foreground text-center">
                  <h3 className="font-bold text-lg">对该项目感兴趣？</h3>
                  <p className="text-sm opacity-90">立即联系 Steven 获取详细资料</p>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
                      <img src="/images/about-cover.jpg" alt="Steven" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Steven</div>
                      <div className="text-sm text-muted-foreground">资深商业地产经纪人</div>
                      <div className="text-xs text-muted-foreground">DRE# 01234567</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full gap-2" size="lg">
                      <Phone className="w-4 h-4" /> (626) 123-4567
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Mail className="w-4 h-4" /> 发送邮件咨询
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground text-center pt-2">
                    <p>联系时请说明来自"宝爸Steven官网"</p>
                    <p>Listing ID: {listing.listing_id}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
