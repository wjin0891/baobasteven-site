import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWechatQr, setShowWechatQr] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("消息已发送！", {
        description: "Steven 会尽快与您联系。",
      });
      // Reset form would go here
    }, 1500);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">联系我们</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-light">
            无论您是想出售生意、寻找仓库，还是咨询商业地产投资，<br className="hidden md:block" />
            Steven 团队都随时为您提供专业服务。
          </p>
        </div>
      </div>

      <div className="container py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <Card className="shadow-lg border-t-4 border-t-secondary">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">电话咨询</h3>
              <p className="text-muted-foreground">
                直接致电 Steven，获取最及时的市场信息和专业建议。
              </p>
              <a href="tel:6261234567" className="block text-xl font-bold text-primary hover:underline">
                (909) 616-8252
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-t-secondary">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">邮件联系</h3>
              <p className="text-muted-foreground">
                发送您的需求详情，我们将在 24 小时内回复您。
              </p>
              <a href="mailto:wjin0891@gmail.com" className="block text-lg font-bold text-primary hover:underline break-all">
                wjin0891@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-t-secondary">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">服务区域</h3>
              <p className="text-muted-foreground">
                深耕洛杉矶东区及内陆帝国，辐射整个南加州。
              </p>
              <div className="text-lg font-bold text-primary">
                Rowland Heights / Chino Hills
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">在线留言</h2>
            <p className="text-muted-foreground mb-8">
              请填写以下表单，告诉我们您的需求。无论是买卖生意、租赁仓库还是投资咨询，我们都会为您提供定制化的解决方案。
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">姓名 <span className="text-destructive">*</span></label>
                  <Input id="name" placeholder="您的称呼" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">电话 <span className="text-destructive">*</span></label>
                  <Input id="phone" placeholder="联系电话" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">电子邮箱</label>
                <Input id="email" type="email" placeholder="example@email.com" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">咨询主题</label>
                <Input id="subject" placeholder="例如：咨询罗兰岗餐厅转让" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">详细需求</label>
                <Textarea 
                  id="message" 
                  placeholder="请描述您的具体需求，例如：预算范围、期望区域、行业偏好等..." 
                  className="min-h-[150px]"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "发送中..." : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> 发送留言
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Map or Image */}
          <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl border border-border relative">
            <img 
              src="/images/home-banner.jpg" 
              alt="Los Angeles Map" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center text-white p-8 text-center">
              <Clock className="w-12 h-12 mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">工作时间</h3>
              <p className="text-lg opacity-90 mb-6">
                周一至周日：9:00 AM - 6:00 PM<br />
                (其他时间请提前预约)
              </p>
              
              {!showWechatQr ? (
                <Button variant="secondary" className="font-semibold" onClick={() => setShowWechatQr(true)}>
                  添加微信咨询
                </Button>
              ) : (
                <div className="space-y-4 w-full max-w-xs">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg">扫码添加微信</h4>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowWechatQr(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-lg">
                    <img 
                      src="/assets/images/wechat-qr.jpg" 
                      alt="WeChat QR Code" 
                      className="w-full rounded"
                    />
                  </div>
                  <p className="text-sm opacity-80">微信ID: stevenhomepage</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}