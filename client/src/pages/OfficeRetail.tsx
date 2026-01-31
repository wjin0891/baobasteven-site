import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ShoppingBag, ArrowRight, MapPin, Ruler, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

// 定义房源数据类型
interface RetailListing {
  id: string;
  title: string;
  type: "lease" | "sale";
  price: string;
  size: string;
  location: string;
  images: string[];
  features: string[];
  description: string;
}

export default function OfficeRetail() {
  const [listings, setListings] = useState<RetailListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/retail.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setListings(data);
        setError(null);
      } catch (err) {
        setError('加载房源数据失败，请稍后重试');
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/office-cover.jpg" 
            alt="Office and Retail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        </div>
        
        <div className="container relative z-10 text-white text-center">
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              办公与商铺<br />
              <span className="text-secondary">Office & Retail</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light leading-relaxed">
              为您寻找最佳的商业展示面和高效办公空间。
            </p>
            <Link href="/contact">
              <Button size="lg" className="text-base px-8 py-6 bg-white text-primary hover:bg-white/90 font-bold">
                提交选址需求
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4" /> 办公地产
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">打造高效办公环境</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              无论是初创企业的共享办公空间，还是跨国公司的总部大楼，我们都能为您匹配最合适的办公场所。
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">1</div>
                <div>
                  <h4 className="font-bold text-foreground">甲级写字楼租赁</h4>
                  <p className="text-sm text-muted-foreground">覆盖 Irvine, Pasadena, Downtown LA 等核心商务区。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">2</div>
                <div>
                  <h4 className="font-bold text-foreground">独栋办公楼买卖</h4>
                  <p className="text-sm text-muted-foreground">适合医疗诊所、律师事务所等专业服务机构的自用物业。</p>
                </div>
              </li>
            </ul>
            <Link href="/contact">
              <Button variant="outline">咨询办公房源</Button>
            </Link>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border">
              <img 
                src="/images/office-cover.jpg" 
                alt="Modern Office" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg border border-border max-w-xs hidden md:block">
              <p className="font-medium text-primary">
                "办公环境直接影响员工效率和企业形象。"
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border">
              <img 
                src="/images/business-cover.jpg" 
                alt="Retail Store" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-4">
              <ShoppingBag className="w-4 h-4" /> 零售商铺
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">抢占黄金商业地段</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              位置决定成败。我们利用大数据分析人流和消费力，助您选定最赚钱的商铺位置。
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">1</div>
                <div>
                  <h4 className="font-bold text-foreground">购物中心 (Shopping Center) 进驻</h4>
                  <p className="text-sm text-muted-foreground">协助品牌入驻 Westfield, South Coast Plaza 等主流商场。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">2</div>
                <div>
                  <h4 className="font-bold text-foreground">社区商铺 (Strip Mall) 租赁</h4>
                  <p className="text-sm text-muted-foreground">适合餐饮、美容、教育等服务业态的高性价比选择。</p>
                </div>
              </li>
            </ul>
            <Link href="/contact">
              <Button variant="outline">咨询商铺房源</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">目前房源紧缺，好位置需要抢！</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            许多优质的办公和商铺资源在上市前就被内部消化了。
            <br />立即登记您的需求，一旦有合适房源，我们将第一时间通知您。
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="font-bold px-8">
              立即登记需求 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Listings Section */}
      <div className="container py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-primary">精选办公商铺房源</h2>
          <p className="text-muted-foreground text-lg">
            我们精心挑选的优质办公和商铺房源，满足您的各种商业需求。
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">加载中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>重新加载</Button>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-xl">
            <p className="text-muted-foreground text-lg">暂无房源</p>
            <p className="text-muted-foreground text-sm mt-2">请稍后再访或联系我们获取最新房源信息</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={listing.images[0] || '/assets/images/placeholder.svg'} 
                    alt={listing.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                      {listing.type === 'lease' ? '出租' : '出售'}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">{listing.title}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-primary">{listing.price}</div>
                    <div className="flex items-center text-muted-foreground">
                      <Ruler className="w-4 h-4 mr-1" />
                      {listing.size}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {listing.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2 mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                    {listing.features.length > 3 && (
                      <div className="text-sm text-muted-foreground">
                        还有 {listing.features.length - 3} 个特色
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {listing.description}
                  </div>
                  
                  <Link href={`/listing/${listing.id}`}>
                    <Button className="w-full">
                      查看详情 <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && listings.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button variant="outline" size="lg">
                查看更多房源 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}