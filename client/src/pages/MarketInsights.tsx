import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function MarketInsights() {
  const posts = [
    {
      id: 1,
      title: "2026年洛杉矶商业地产市场展望：机遇与挑战并存",
      category: "市场趋势",
      date: "2026-01-15",
      readTime: "5 min read",
      excerpt: "随着美联储降息预期的升温，洛杉矶商业地产市场正在迎来新的转机。本文深度分析了零售、办公及工业地产的三大趋势。",
      image: "/images/home-banner.jpg"
    },
    {
      id: 2,
      title: "如何在加州购买生意？新手必读的尽职调查清单",
      category: "买家指南",
      date: "2025-12-20",
      readTime: "8 min read",
      excerpt: "买生意不仅仅是看财务报表。从租约审核到设备检查，这 10 个关键点如果你忽略了，可能会带来巨大的隐患。",
      image: "/images/business-cover.jpg"
    },
    {
      id: 3,
      title: "SBA 504 贷款详解：中小企业如何低首付买仓库",
      category: "融资贷款",
      date: "2025-11-10",
      readTime: "6 min read",
      excerpt: "不想再给房东交租金？SBA 504 贷款允许中小企业主以低至 10% 的首付购买自用商业房产。看看你是否符合条件。",
      image: "/images/industrial-cover.jpg"
    },
    {
      id: 4,
      title: "餐厅选址避坑指南：除了人流，你还应该看什么？",
      category: "选址策略",
      date: "2025-10-05",
      readTime: "4 min read",
      excerpt: "排烟管道、隔油池、停车位配比...这些看似不起眼的工程细节，往往决定了一家餐厅的生死存亡。",
      image: "/images/business-cover.jpg"
    },
    {
      id: 5,
      title: "NNN Lease (三净租赁) 投资入门：躺着收租真的可行吗？",
      category: "投资理财",
      date: "2025-09-18",
      readTime: "7 min read",
      excerpt: "对于寻求稳定现金流的投资人来说，NNN Lease 是一个极佳的选择。但如何筛选靠谱的租客？如何规避空置风险？",
      image: "/images/office-cover.jpg"
    },
    {
      id: 6,
      title: "洛杉矶东区 vs 内陆帝国：工业地产投资回报率大比拼",
      category: "区域分析",
      date: "2025-08-22",
      readTime: "5 min read",
      excerpt: "City of Industry 租金高但回报率低？Ontario 升值潜力大？用数据说话，带你从投资回报率角度看两大热门区域。",
      image: "/images/industrial-cover.jpg"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-muted/30 py-20 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">市场洞察与资源</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            分享最前沿的洛杉矶商业地产资讯、政策解读与实操指南，助您做出明智的投资决策。
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border group cursor-pointer">
              <div className="aspect-video relative overflow-hidden rounded-t-xl">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-sm">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </div>
                </div>
                <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </CardHeader>
              
              <CardContent className="flex-grow pb-4">
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </CardContent>
              
              <CardFooter className="pt-0 border-t border-border/30 mt-auto p-6">
                <div className="text-primary font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                  阅读全文 <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" disabled>
            加载更多文章
          </Button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">订阅市场简报</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            不想错过最新的商业地产投资机会？每周一封邮件，为您送上独家房源和市场分析。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="您的邮箱地址" 
              className="flex-grow bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
            />
            <Button variant="secondary" size="lg" className="font-bold">
              免费订阅
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-4">
            我们尊重您的隐私，绝不发送垃圾邮件。您可以随时取消订阅。
          </p>
        </div>
      </div>
    </Layout>
  );
}
