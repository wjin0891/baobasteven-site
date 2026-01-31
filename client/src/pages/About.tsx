import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Award, Users, ThumbsUp } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-white skew-x-12 transform translate-x-1/3"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wide uppercase">
                关于 Steven
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                不仅是经纪人，<br />
                更是您的<span className="text-secondary">商业合作伙伴</span>
              </h1>
              <p className="text-xl opacity-90 font-light leading-relaxed">
                居住于 Chino Hills，深耕洛杉矶东区。作为一名“宝爸”，我深知责任与承诺的重要性。我将这份责任感带入每一次商业地产交易中。
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="font-semibold">
                    预约咨询
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 max-w-md mx-auto">
                <img 
                  src="/images/about-cover.jpg" 
                  alt="Steven Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats / Trust Indicators */}
      <div className="py-12 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">年行业经验</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">$50M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">累计成交金额</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">服务企业客户</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">客户满意度</div>
            </div>
          </div>
        </div>
      </div>

      {/* My Story */}
      <div className="py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">我的故事与理念</h2>
            
            <div className="prose prose-lg text-muted-foreground mx-auto">
              <p>
                大家好，我是 Steven。在进入商业地产领域之前，我有着多年的企业管理经验。这段经历让我能够站在“经营者”的角度去审视每一个地产项目。
              </p>
              <p>
                当我为您寻找一家餐厅店铺时，我不仅看它的租金和位置，更会帮您分析它的客流结构、厨房动线、甚至排烟系统的合规性。因为我深知，对于一个生意来说，地产不仅仅是物理空间，更是产生利润的载体。
              </p>
              <p>
                作为一名居住在 Chino Hills 的“宝爸”，我热爱这片土地。我见证了洛杉矶东区和内陆帝国的蓬勃发展。我希望通过我的专业服务，帮助更多的华人家庭和企业在这里扎根、发展、壮大。
              </p>
              <p>
                我的服务理念很简单：<strong>诚信、专业、共赢。</strong> 我不追求一次性的交易，我追求的是成为您长期的商业地产顾问。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <Card className="bg-muted/20 border-none shadow-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <Award className="w-10 h-10 text-primary mx-auto" />
                  <h3 className="font-bold text-lg">专业认证</h3>
                  <p className="text-sm text-muted-foreground">
                    加州持牌房地产经纪人 (DRE# 02169359)，RE/MAX GALAXY 资深顾问。
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/20 border-none shadow-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <Users className="w-10 h-10 text-primary mx-auto" />
                  <h3 className="font-bold text-lg">广阔人脉</h3>
                  <p className="text-sm text-muted-foreground">
                    深厚的本地社区联系，掌握大量 Off-market 独家房源信息。
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/20 border-none shadow-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <ThumbsUp className="w-10 h-10 text-primary mx-auto" />
                  <h3 className="font-bold text-lg">口碑推荐</h3>
                  <p className="text-sm text-muted-foreground">
                    超过 80% 的业务来自老客户推荐，服务质量有口皆碑。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Service Promise */}
      <div className="py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">我的服务承诺</h2>
              <p className="text-primary-foreground/80 text-lg">
                在每一个环节，我都将全力以赴，为您保驾护航。
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">真实房源</h3>
                  <p className="text-primary-foreground/70">所有展示房源均经过实地考察和尽职调查，确保信息真实可靠。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">透明交易</h3>
                  <p className="text-primary-foreground/70">坚持交易流程透明化，无隐形收费，让您每一分钱都花得明白。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">快速响应</h3>
                  <p className="text-primary-foreground/70">7x24小时待命，第一时间回复您的咨询，不错过任何商业机会。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0 font-bold">4</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">售后无忧</h3>
                  <p className="text-primary-foreground/70">交易结束不是服务的终点。提供长期的售后咨询和资源对接服务。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
