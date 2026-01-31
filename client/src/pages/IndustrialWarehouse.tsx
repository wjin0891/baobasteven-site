import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Warehouse, Truck, ArrowRight, MapPin, Ruler, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

// 定义房源数据类型
interface IndustrialListing {
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

export default function IndustrialWarehouse() {
  const [listings, setListings] = useState<IndustrialListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/industrial.json');
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
      <div className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/industrial-cover.jpg" 
            alt="Industrial Warehouse" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              工业与仓库地产<br />
              <span className="text-secondary">Industrial & Warehouse</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light leading-relaxed">
              专注于洛杉矶东区及内陆帝国 (Inland Empire) 的工业地产市场。为您提供专业的仓库买卖、租赁及投资分析服务。
            </p>
            <Link href="/contact">
              <Button size="lg" className="text-base px-8 py-6 bg-secondary text-primary hover:bg-secondary/90 font-bold">
                咨询仓库资源
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Tabs */}
      <div className="container py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-primary">我们的专业服务</h2>
          <p className="text-muted-foreground text-lg">
            无论您是寻找自用仓库的企业主，还是寻求稳定回报的投资人，我们都能为您提供定制化方案。
          </p>
        </div>

        <Tabs defaultValue="buy-sell" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="buy-sell" className="text-lg py-3">仓库买卖</TabsTrigger>
            <TabsTrigger value="lease" className="text-lg py-3">仓库租赁</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy-sell" className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-t-4 border-t-primary shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Building2 className="w-8 h-8 text-primary" />
                    自用仓库购买
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    协助企业主寻找符合生产、仓储需求的工业厂房。
                  </p>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>SBA 贷款协助（首付低至 10%）</li>
                    <li>电力、层高、卸货平台 (Loading Dock) 评估</li>
                    <li>区域规划 (Zoning) 核查</li>
                    <li>未来增值潜力分析</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-secondary shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Warehouse className="w-8 h-8 text-secondary" />
                    投资型仓库
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    为投资人筛选带租约或高回报潜力的工业地产项目。
                  </p>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>Cap Rate (回报率) 精算</li>
                    <li>现有租客资质审核</li>
                    <li>NNN Lease (三净租赁) 谈判</li>
                    <li>1031 Exchange (税务递延) 协助</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="lease" className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-t-4 border-t-primary shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Truck className="w-8 h-8 text-primary" />
                    企业选址租赁
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    根据您的物流配送范围，精准匹配最佳仓库位置。
                  </p>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>租金市场行情分析</li>
                    <li>免租期 (Free Rent) 争取</li>
                    <li>TI (装修补贴) 谈判</li>
                    <li>租约条款审核与风险规避</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-none flex flex-col justify-center items-center text-center p-8">
                <h3 className="text-xl font-bold mb-4">正在寻找仓库？</h3>
                <p className="text-muted-foreground mb-6">
                  我们手头有大量未上市 (Off-market) 的仓库租赁资源，涵盖 Chino, Ontario, City of Industry 等核心区域。
                </p>
                <Link href="/contact">
                  <Button size="lg" className="w-full md:w-auto">
                    立即联系 Steven <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Market Insights Preview */}
      <div className="bg-muted/30 py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">工业地产市场洞察</h2>
              <p className="text-muted-foreground text-lg">
                了解最新的市场动态，做出明智的决策。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-sm text-secondary font-bold mb-2 uppercase tracking-wider">市场趋势</div>
              <h3 className="text-xl font-bold mb-3">2026年内陆帝国仓库租金走势预测</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                随着供应链的调整和电商的持续发展，Inland Empire 的仓库空置率依然保持低位，租金预计将温和上涨...
              </p>
              <Link href="/market-insights">
                <span className="text-primary font-medium text-sm hover:underline cursor-pointer">阅读全文</span>
              </Link>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-sm text-secondary font-bold mb-2 uppercase tracking-wider">政策解读</div>
              <h3 className="text-xl font-bold mb-3">新环保法规对工业地产的影响</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                加州最新的卡车排放法规将如何影响仓库选址？企业主需要注意哪些合规风险？
              </p>
              <Link href="/market-insights">
                <span className="text-primary font-medium text-sm hover:underline cursor-pointer">阅读全文</span>
              </Link>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-sm text-secondary font-bold mb-2 uppercase tracking-wider">投资指南</div>
              <h3 className="text-xl font-bold mb-3">SBA 504 贷款：中小企业买仓库的利器</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                首付仅需 10%，固定低利率。深度解析 SBA 504 贷款的申请条件和流程。
              </p>
              <Link href="/market-insights">
                <span className="text-primary font-medium text-sm hover:underline cursor-pointer">阅读全文</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Listings Section */}
      <div className="container py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-primary">精选工业仓库房源</h2>
          <p className="text-muted-foreground text-lg">
            我们精心挑选的优质工业仓库房源，满足您的各种需求。
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