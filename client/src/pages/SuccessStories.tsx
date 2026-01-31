import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Quote, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

// 定义成功案例数据类型
interface SuccessStory {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  quote: string;
  author: string;
  role: string;
}

export default function SuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/cases/cases.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStories(data);
        setError(null);
      } catch (err) {
        setError('加载成功案例数据失败，请稍后重试');
        console.error('Error fetching stories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

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
        ) : stories.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-xl">
            <p className="text-muted-foreground text-lg">暂无成功案例</p>
            <p className="text-muted-foreground text-sm mt-2">请稍后再访或联系我们了解更多信息</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {stories.map((story, index) => (
              <div 
                key={story.id} 
                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-border relative group">
                    <img 
                      src={story.image || '/assets/images/placeholder.svg'} 
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
        )}

        {!loading && stories.length > 0 && (
          <div className="mt-24 text-center">
            <h2 className="text-2xl font-bold mb-6">准备好书写您的成功故事了吗？</h2>
            <Link href="/contact">
              <Button size="lg" className="px-8">
                立即开始合作 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}