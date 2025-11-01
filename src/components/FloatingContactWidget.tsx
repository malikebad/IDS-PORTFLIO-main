import { useState } from "react";
import { MessageSquare, X, Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FloatingContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mjkppvla", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        form.reset();
        setIsOpen(false);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Message Failed to Send",
        description: "Please try again or contact us directly at info@inventerdesignstudio.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-110 transition-all duration-300 bg-primary hover:bg-primary/90"
          size="icon"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Contact Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-2xl border border-primary/10 w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Contact Us</h3>
                  <p className="text-sm text-muted-foreground">Get in touch with our team</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="widget-name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <Input
                  id="widget-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="bg-background/50 border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="widget-email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="widget-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-background/50 border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="widget-phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <Input
                  id="widget-phone"
                  name="phone"
                  type="text"
                  placeholder="Your phone number"
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="widget-subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <Input
                  id="widget-subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="bg-background/50 border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="widget-message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="widget-message"
                  name="message"
                  placeholder="Tell us what you need"
                  rows={4}
                  className="bg-background/50 border-primary/20 focus:border-primary resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContactWidget;