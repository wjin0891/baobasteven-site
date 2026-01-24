import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Store, Briefcase, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import ListingCard, { Listing } from "@/components/ListingCard";

export default function Home() {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

  useEffect(() => {
    // In a real app, we would fetch this from an API
    // For now, we'll import the JSON directly or fetch it from the public folder
    fetch('/shared/listings.json')
      .then(res => {
        if (!res.ok) {
          // Fallback to importing directly if fetch fails (dev environment)
          return import('../../../shared/listings.json').then(m => m.default);
        }
        return res.json();
      })
      .then(data => {
        // Select 3 random listings for the homepage
        setFeaturedListings(data.slice(0, 3));
      })
      .catch(err => console.error("Failed to load listings", err));
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/home-banner.jpg" 
            alt="Los Angeles Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="container relative z-10 text-white pt-20">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wide uppercase">
              RE/MAX GALAXY 顶级商业地产团队
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
              洛杉矶商业地产<br />
              <span className="text-secondary">专业投资顾问</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 font-light leading-relaxed max-w-xl">
              深耕南加州市场，为您提供生意转让、仓库买卖与租赁的一站式专业服务。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/business-for-sale">
                <Button size="lg" className="text-base px-8 py-6 bg-white text-primary hover:bg-white/90 font-semibold">
                  浏览精选房源
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 border-white text-white hover:bg-white/10 hover:text-white font-semibold bg-transparent">
                  预约免费咨询
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">全方位商业地产服务</h2>
            <p className="text-muted-foreground text-lg">
              依托 RE/MAX 全球品牌资源，结合本地深耕经验，为您提供最精准的商业地产解决方案。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/business-for-sale">
              <div className="group p-8 rounded-xl border border-border bg-card hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Store className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">生意转让</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  精选优质餐饮、零售、服务类生意资源。从选址评估到过户交接，全程协助您完成生意买卖。
                </p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                  查看房源 <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/industrial-warehouse">
              <div className="group p-8 rounded-xl border border-border bg-card hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">工业/仓库</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  专注于洛杉矶东区及内陆帝国的工业地产。提供仓库买卖、租赁、投资回报分析等专业服务。
                </p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                  查看房源 <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/office-retail">
              <div className="group p-8 rounded-xl border border-border bg-card hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">办公/商铺</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  覆盖核心商圈的办公楼与零售商铺资源。协助您寻找最佳商业选址，助力企业发展。
                </p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                  查看房源 <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">精选房源推荐</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                为您甄选最具投资价值的商业地产项目，每一个项目都经过严格的尽职调查。
              </p>
            </div>
            <Link href="/business-for-sale">
              <Button variant="outline" className="hidden md:flex">
                查看全部房源 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.listing_id} listing={listing} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/business-for-sale">
              <Button variant="outline" className="w-full">
                查看全部房源 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/4" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">为什么选择 Steven 团队？</h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                作为居住于 Chino Hills 的本地专家，我深知洛杉矶商业地产的每一个细节。
                结合 RE/MAX GALAXY 的强大平台，为您提供从选址、谈判到过户的全流程服务。
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">本地深耕，资源丰富</h4>
                    <p className="text-primary-foreground/70 text-sm">拥有广泛的本地人脉网络和独家房源信息，助您抢占先机。</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">专业谈判，利益最大化</h4>
                    <p className="text-primary-foreground/70 text-sm">凭借丰富的商业谈判经验，为您争取最优的价格和条款。</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">诚信为本，口碑至上</h4>
                    <p className="text-primary-foreground/70 text-sm">始终将客户利益放在首位，以诚信赢得长久的信任与合作。</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="font-semibold">
                    了解更多关于 Steven
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img 
                  src="/images/about-cover.jpg" 
                  alt="Steven Professional" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary text-primary p-6 rounded-lg shadow-xl max-w-xs">
                <p className="font-serif italic text-lg font-medium">
                  "做生意不仅仅是交易，更是建立长久的信任关系。"
                </p>
                <p className="mt-2 text-sm font-bold text-right">— Steven</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
