import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Quote, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      title: "帮助首次创业者成功接手罗兰岗知名奶茶店",
      category: "生意转让",
      location: "Rowland Heights",
      image: "/images/business-cover.jpg",
      quote: "Steven 不仅帮我谈下了理想的价格，还手把手教我如何办理各种执照，对于我这个新手来说太重要了！",
      author: "王先生 (Mr. Wang)",
      role: "奶茶店主"
    },
    {
      id: 2,
      title: "协助物流公司在 Ontario 扩租 50,000 呎仓库",
      category: "仓库租赁",
      location: "Ontario",
      image: "/images/industrial-cover.jpg",
      quote: "我们的业务增长很快，急需大仓库。Steven 团队在短短两周内就帮我们找到了合适的场地，效率惊人。",
      author: "李总 (CEO)",
      role: "跨境物流公司"
    },
    {
      id: 3,
      title: "为牙科诊所在 Irvine 核心区寻得完美办公点",
      category: "办公租赁",
      location: "Irvine",
      image: "/images/office-cover.jpg",
      quote: "医疗诊所对选址要求很苛刻。Steven 对 Zoning 和工程条件的专业知识，帮我们避开了许多潜在的大坑。",
      author: "Dr. Zhang",
      role: "牙科诊所创始人"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-muted/30 py-20 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">真实成交案例</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            每一个案例背后，都是一份信任的托付。我们用专业和结果，回报每一位客户的信任。
          </p>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="container py-24">
        <div className="grid grid-cols-1 gap-12">
          {stories.map((story, index) => (
            <div 
              key={story.id} 
              className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2">
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-border relative group">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="font-bold shadow-sm">{story.category}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mr-1" /> {story.location}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
                  {story.title}
                </h2>
                
                <Card className="bg-muted/20 border-none relative overflow-visible mt-6">
                  <Quote className="absolute -top-4 -left-2 w-8 h-8 text-primary/20 fill-current" />
                  <CardContent className="p-6 pt-8 italic text-muted-foreground text-lg leading-relaxed">
                    "{story.quote}"
                  </CardContent>
                  <CardHeader className="p-6 pt-0 pb-6 flex flex-row items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{story.author}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{story.role}</div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-6">准备好书写您的成功故事了吗？</h2>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              立即开始合作 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
