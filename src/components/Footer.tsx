// Footer component with links and social media
import Link from "next/link";
import Script from "next/script";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { CyberpunkLogo } from "@/components/CyberpunkLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Lytics tracking tag */}
      <Script
        id="lytics-footer"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
jstag.init({ src: 'https://c.lytics.io/api/tag/310c5dfc29f534db76db2f91db7477d8/latest.min.js' });
jstag.pageView();
          `,
        }}
      />
      <footer className="border-t border-primary/10 glass-dark mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <CyberpunkLogo showText={true} />
              <p className="text-sm text-muted-foreground">
                Next-gen shopping experience. Premium products for a premium lifestyle.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Audio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Audio
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Electronics" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Accessories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 mb-4">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Shipping Policy
                  </a>
                </li>
              </ul>
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a href="#" className="p-2 rounded-lg glass border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all hover-lift" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
                <a href="#" className="p-2 rounded-lg glass border border-accent/20 hover:border-accent hover:bg-accent/10 transition-all hover-lift" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-accent" />
                </a>
                <a href="#" className="p-2 rounded-lg glass border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all hover-lift" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a href="#" className="p-2 rounded-lg glass border border-accent/20 hover:border-accent hover:bg-accent/10 transition-all hover-lift" aria-label="GitHub">
                  <Github className="h-5 w-5 text-accent" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-primary/10 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} <span className="gradient-text font-semibold">Elite Store</span>. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Built with 💜 using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
