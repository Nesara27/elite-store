
// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Script from "next/script";
// import { useRouter } from "next/navigation";
// import { ShoppingCart, Menu, X, User, Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Badge } from "@/components/ui/badge";
// import { CyberpunkLogo } from "@/components/CyberpunkLogo";

// interface NavbarProps {
//   cartCount: number;
//   onCartClick: () => void;
//   onAuthClick: () => void;
// }

// export function Navbar({ cartCount, onCartClick, onAuthClick }: NavbarProps) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [searchOpen]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchOpen(false);
//       setSearchQuery("");
//     }
//   };

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/shop", label: "Shop" },
//     { href: "/shop?category=Clothing", label: "Clothing" },
//     { href: "/shop?category=Footwear", label: "Footwear" },
//   ];

//   return (
//     <>
//       {/* ✅ Replaced with new Lytics script */}
//       <Script
//         id="lytics-navbar"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
// !function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];
// function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];
// r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),
// n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){
// var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;
// var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,
// c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},
// o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){
// if(o.init===n)throw new Error("Load error!");o.init(o.config),
// function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
// // Initialize Lytics
// jstag.init({
//   src: 'https://c.lytics.io/api/tag/e12c6acf52b278289709359950da0335/latest.min.js'
// });
// // Send page view
// jstag.pageView();
//           `,
//         }}
//       />

//       <header className="sticky top-0 z-50 w-full border-b border-primary/10 glass-dark">
//         <nav className="container mx-auto flex h-16 items-center justify-between px-4">
//           <CyberpunkLogo showText={true} />

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navLinks.map((link) =>
//               link.label === "Shop" ? (
//                 <Link key={link.href} href={link.href}>
//                   <Button size="sm" className="font-semibold">
//                     {link.label}
//                   </Button>
//                 </Link>
//               ) : (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   {link.label}
//                 </Link>
//               )
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex items-center space-x-2">
//             {/* Search */}
//             <div className="relative hidden sm:flex items-center">
//               {searchOpen && (
//                 <form onSubmit={handleSearch} className="absolute right-12 animate-fade-in">
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search products..."
//                     className="w-64 px-4 py-2 rounded-full bg-background/95 backdrop-blur-sm border border-primary/30 focus:border-primary focus:outline-none text-sm"
//                     onBlur={() => {
//                       setTimeout(() => {
//                         if (!searchQuery) setSearchOpen(false);
//                       }, 200);
//                     }}
//                   />
//                 </form>
//               )}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setSearchOpen(!searchOpen)}
//                 aria-label="Search"
//               >
//                 <Search className="h-5 w-5" />
//               </Button>
//             </div>

//             {/* Auth Button */}
//             <Button variant="ghost" size="icon" onClick={onAuthClick} aria-label="Account">
//               <User className="h-5 w-5" />
//             </Button>

//             {/* Cart Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="relative"
//               onClick={onCartClick}
//               aria-label="Shopping cart"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {cartCount > 0 && (
//                 <Badge
//                   className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
//                   variant="destructive"
//                 >
//                   {cartCount}
//                 </Badge>
//               )}
//             </Button>

//             {/* Mobile Menu */}
//             <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[300px]">
//                 <div className="flex flex-col space-y-4 mt-8">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       onClick={() => setMobileOpen(false)}
//                       className="text-lg font-medium hover:text-accent transition-colors"
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// }


// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Script from "next/script";
// import { useRouter } from "next/navigation";
// import {
//   ShoppingCart,
//   Menu,
//   X,
//   User,
//   Search,
//   ChevronDown,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Badge } from "@/components/ui/badge";
// import { CyberpunkLogo } from "@/components/CyberpunkLogo";

// interface NavbarProps {
//   cartCount: number;
//   onCartClick: () => void;
//   onAuthClick: () => void;
// }

// type MeUser = {
//   name?: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   role?: string;
//   avatar?: string | null;
// };

// export function Navbar({ cartCount, onCartClick, onAuthClick }: NavbarProps) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const searchInputRef = useRef<HTMLInputElement | null>(null);
//   const router = useRouter();

//   // Auth/profile state
//   const [user, setUser] = useState<MeUser | null>(null);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const profileRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
//   }, [searchOpen]);

//   /* -------------------------
//      Normalization + helpers
//      ------------------------- */
//   const normalize_and_set_user = (u: any | null, source = "unknown") => {
//     if (!u) {
//       console.debug(`Navbar: normalize_and_set_user -> null (source=${source})`);
//       setUser(null);
//       return;
//     }

//     const first =
//       u.firstName ?? u.first_name ?? u.first ?? (u.name ? undefined : undefined);
//     const last = u.lastName ?? u.last_name ?? u.last ?? undefined;
//     const rawName =
//       u.name ??
//       u.fullName ??
//       u.username ??
//       (first ? `${first} ${last ?? ""}`.trim() : undefined);

//     const displayName =
//       rawName ??
//       (typeof u.email === "string" ? u.email.split("@")[0] : undefined) ??
//       undefined;

//     const normalized: MeUser = {
//       name: displayName,
//       firstName: first,
//       lastName: last,
//       email: u.email ?? u.email_address ?? undefined,
//       role: u.role ?? u.role_name ?? undefined,
//       avatar: u.avatar_url ?? u.avatar ?? null,
//     };

//     console.debug("Navbar: normalize_and_set_user ->", normalized, `(source=${source})`);
//     setUser(normalized);
//   };

//   // fetch authoritative /api/auth/me but don't overwrite valid local user with null response
//   const fetchMe = async () => {
//     try {
//       console.debug("Navbar: fetchMe -> calling /api/auth/me");
//       const res = await fetch("/api/auth/me", { credentials: "include" });
//       console.debug("Navbar: fetchMe -> status", res.status);
//       if (!res.ok) {
//         console.warn("Navbar: fetchMe -> not ok, will NOT clear local user.");
//         return; // Do not clear local user snapshot if /me fails
//       }
//       const data = await res.json().catch((e) => {
//         console.warn("Navbar: fetchMe -> json parse error", e);
//         return null;
//       });
//       const payload = data?.user ?? data ?? null;
//       console.debug("Navbar: fetchMe -> received", payload);

//       // Only update if payload contains meaningful identity fields
//       if (payload && (payload.email || payload.firstName || payload.name)) {
//         normalize_and_set_user(payload, "fetch_me");
//       } else {
//         console.warn("Navbar: fetchMe -> payload empty or null; keeping local user");
//       }
//     } catch (err) {
//       console.error("Navbar: fetchMe error", err);
//       // keep local user if exists
//     }
//   };

//   // Try quick local read then call fetchMe
//   useEffect(() => {
//     try {
//       console.debug("Navbar: reading localStorage keys ->", Object.keys(localStorage || {}));
//     } catch {}

//     try {
//       const raw = localStorage.getItem("user");
//       console.debug("Navbar: localStorage.user raw ->", raw);
//       if (raw) {
//         try {
//           const parsed = JSON.parse(raw);
//           // Only set if parsed has some useful fields
//           if (parsed && (parsed.email || parsed.firstName || parsed.name)) {
//             normalize_and_set_user(parsed, "localStorage");
//           } else {
//             console.debug("Navbar: localStorage.user found but no identity fields ->", parsed);
//           }
//         } catch (e) {
//           console.warn("Navbar: failed to parse localStorage.user", e);
//         }
//       } else {
//         console.debug("Navbar: no localStorage.user found");
//       }
//     } catch (e) {
//       console.warn("Navbar: read localStorage.user error", e);
//     }

//     // then fetch authoritative session data
//     fetchMe();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Listen to cross-tab localStorage changes and custom auth events
//   useEffect(() => {
//     const onStorage = (e: StorageEvent) => {
//       if (e.key === "user") {
//         console.debug("Navbar: storage event user changed ->", e.newValue);
//         try {
//           const parsed = e.newValue ? JSON.parse(e.newValue) : null;
//           if (parsed && (parsed.email || parsed.firstName || parsed.name)) {
//             normalize_and_set_user(parsed, "storage_event");
//           } else {
//             console.debug("Navbar: storage event user not useful ->", parsed);
//             // don't clear; wait for /me if needed
//           }
//         } catch (err) {
//           console.warn("Navbar: storage event parse error", err);
//         }
//       }
//       if (e.key === "auth:force-refresh") {
//         console.debug("Navbar: storage event auth:force-refresh -> fetchMe()");
//         fetchMe();
//       }
//     };

//     const onAuthChanged = () => {
//       console.debug("Navbar: custom auth event -> fetchMe()");
//       fetchMe();
//     };

//     window.addEventListener("storage", onStorage);
//     window.addEventListener("auth:changed", onAuthChanged as EventListener);
//     window.addEventListener("auth:login", onAuthChanged as EventListener);
//     window.addEventListener("auth:logout", onAuthChanged as EventListener);

//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener("auth:changed", onAuthChanged as EventListener);
//       window.removeEventListener("auth:login", onAuthChanged as EventListener);
//       window.removeEventListener("auth:logout", onAuthChanged as EventListener);
//     };
//   }, []);

//   // close profile dropdown on outside click
//   useEffect(() => {
//     function handler(e: MouseEvent) {
//       if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
//         setProfileOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;
//     router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
//     setSearchQuery("");
//     setSearchOpen(false);
//   };

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/shop", label: "Shop" },
//     { href: "/shop?category=Clothing", label: "Clothing" },
//     { href: "/shop?category=Footwear", label: "Footwear" },
//   ];

//   // Logout: call server (if available), clear local storage, notify tabs, redirect to /login
//   const onLogout = async () => {
//     console.debug("Navbar: logout initiated");

//     // Try server logout, but don't block clearing local storage on failure
//     try {
//       const res = await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       console.debug("Navbar: /api/auth/logout response", res.status);
//       try {
//         const json = await res.json().catch(() => null);
//         console.debug("Navbar: /api/auth/logout json:", json);
//       } catch {}
//     } catch (err) {
//       console.warn("Navbar: network error calling /api/auth/logout (ignored)", err);
//     }

//     // ALWAYS clear client-side session state
//     try {
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("user");
//       // nudge other tabs to refresh
//       localStorage.setItem("auth:force-refresh", Date.now().toString());
//       localStorage.removeItem("auth:force-refresh");
//       console.debug("Navbar: cleared authToken & user from localStorage");
//     } catch (err) {
//       console.warn("Navbar: error clearing localStorage", err);
//     }

//     // update in-memory UI
//     setUser(null);
//     setProfileOpen(false);

//     // same-tab listeners
//     window.dispatchEvent(new Event("auth:changed"));
//     // redirect user to login
//     router.push("/login");
//   };

//   return (
//     <>
//       <Script
//         id="lytics-navbar"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `!function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();jstag.init({src:'https://c.lytics.io/api/tag/e12c6acf52b278289709359950da0335/latest.min.js'});jstag.pageView();`,
//         }}
//       />

//       <header className="sticky top-0 z-50 w-full border-b border-primary/10 glass-dark">
//         <nav className="container mx-auto flex h-16 items-center justify-between px-4">
//           <CyberpunkLogo showText={true} />

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navLinks.map((link) =>
//               link.label === "Shop" ? (
//                 <Link key={link.href} href={link.href}>
//                   <Button size="sm" className="font-semibold">
//                     {link.label}
//                   </Button>
//                 </Link>
//               ) : (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   {link.label}
//                 </Link>
//               )
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex items-center space-x-2">
//             {/* Search */}
//             <div className="relative hidden sm:flex items-center">
//               {searchOpen && (
//                 <form onSubmit={handleSearch} className="absolute right-12 animate-fade-in">
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search products..."
//                     className="w-64 px-4 py-2 rounded-full bg-background/95 backdrop-blur-sm border border-primary/30 focus:border-primary focus:outline-none text-sm"
//                     onBlur={() => {
//                       setTimeout(() => {
//                         if (!searchQuery) setSearchOpen(false);
//                       }, 200);
//                     }}
//                   />
//                 </form>
//               )}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setSearchOpen((s) => !s)}
//                 aria-label="Search"
//               >
//                 <Search className="h-5 w-5" />
//               </Button>
//             </div>

//             {/* PROFILE */}
//             <div
//               ref={profileRef}
//               className="relative"
//             >
//               {/* Toggle dropdown on click so mouse gaps don't accidentally close it */}
//               {user ? (
//                 <button
//                   className="inline-flex items-center gap-2 px-3 py-1 rounded-md hover:bg-background/80"
//                   aria-label="Account"
//                   onClick={() => setProfileOpen((s) => !s)}
//                 >
//                   <User className="h-5 w-5" />
//                   <span className="hidden md:inline text-sm">{user.name}</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//               ) : (
//                 <button
//                   className="inline-flex items-center gap-2 px-3 py-1 rounded-md hover:bg-background/80"
//                   aria-label="Account"
//                   onClick={() => setProfileOpen((s) => !s)}
//                 >
//                   <User className="h-5 w-5" />
//                   <span className="hidden md:inline text-sm">Account</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//               )}

//               {/* Dropdown */}
//               {profileOpen && (
//                 <div
//                   className="absolute right-0 top-full mt-2 w-64 rounded-lg overflow-hidden border shadow-lg"
//                   style={{
//                     background: "linear-gradient(180deg,#2A0B3D,#3B0F5E)",
//                     color: "white",
//                     borderColor: "rgba(139,92,246,0.15)",
//                   }}
//                 >
//                   <div className="px-4 py-3">
//                     <div className="flex items-center gap-3">
//                       <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
//                         <User className="h-5 w-5 text-white" />
//                       </div>
//                       <div>
//                         {user ? (
//                           <>
//                             <div className="font-semibold text-sm text-white">{user.name}</div>
//                             <div className="text-xs text-white/80">{user.email}</div>
//                           </>
//                         ) : (
//                           <>
//                             <div className="font-semibold text-sm text-white">Welcome</div>
//                             <div className="text-xs text-white/80">Sign in to access your account</div>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="px-3 pb-3 flex flex-col gap-2">
//                     {user ? (
//                       <button
//                         onClick={onLogout}
//                         className="mt-1 rounded-md bg-rose-600 text-white py-2 text-sm font-semibold hover:bg-rose-700"
//                       >
//                         Logout
//                       </button>
//                     ) : (
//                       <>
//                       <Link href="/login" onClick={() => setProfileOpen(false)}>
//                         <button
//                           onClick={() => {
//                             setProfileOpen(false);
//                             onAuthClick();
//                           }}
//                           className="mt-1 rounded-md bg-indigo-600 text-white py-2 text-sm font-semibold hover:bg-indigo-700"
//                         >
//                           Login
//                         </button>
//                         </Link>
//                         <Link href="/signup" onClick={() => setProfileOpen(false)}>
//                           <button className="rounded-md bg-transparent border border-white/20 text-white py-2 text-sm font-semibold hover:bg-white/5">
//                             SignUp
//                           </button>
//                         </Link>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Cart Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="relative"
//               onClick={onCartClick}
//               aria-label="Shopping cart"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {cartCount > 0 && (
//                 <Badge
//                   className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
//                   variant="destructive"
//                 >
//                   {cartCount}
//                 </Badge>
//               )}
//             </Button>

//             {/* Mobile Menu */}
//             <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[300px]">
//                 <div className="flex flex-col space-y-4 mt-8">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       onClick={() => setMobileOpen(false)}
//                       className="text-lg font-medium hover:text-accent transition-colors"
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// }

// export default Navbar;

"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CyberpunkLogo } from "@/components/CyberpunkLogo";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onAuthClick: () => void;
}

type MeUser = {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  avatar?: string | null;
};

export function Navbar({ cartCount, onCartClick, onAuthClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [user, setUser] = useState<MeUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  const normalize_and_set_user = (u: any | null) => {
    if (!u) return setUser(null);
    const normalized: MeUser = {
      name:
        u.name ??
        u.fullName ??
        u.username ??
        (u.email ? u.email.split("@")[0] : "User"),
      email: u.email,
    };
    setUser(normalized);
  };

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) normalize_and_set_user(JSON.parse(raw));
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=Clothing", label: "Clothing" },
    { href: "/shop?category=Footwear", label: "Footwear" },
  ];

  return (
    <>
      <Script
        id="lytics-navbar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),o.init=function(n){return this.config=n,this} }();`,
        }}
      />

      <header className="sticky top-0 z-50 w-full border-b border-primary/10 glass-dark">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <CyberpunkLogo showText={true} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.label === "Shop" ? (
                <Link key={link.href} href={link.href}>
                  <Button
                    size="sm"
                    className="font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                  >
                    {link.label}
                  </Button>
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative hidden sm:flex items-center">
              {searchOpen && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/shop?search=${searchQuery}`);
                    setSearchOpen(false);
                  }}
                  className="absolute right-12 animate-fade-in"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-64 px-4 py-2 rounded-full bg-background/90 backdrop-blur-md border border-purple-500/50 focus:border-purple-400 focus:outline-none text-sm text-white"
                  />
                </form>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen((s) => !s)}
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-purple-300" />
              </Button>
            </div>

            {/* PROFILE DROPDOWN */}
            <div ref={profileRef} className="relative">
              <button
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md hover:bg-purple-900/40 text-white"
                onClick={() => setProfileOpen((s) => !s)}
              >
                <User className="h-5 w-5" />
                <span className="hidden md:inline text-sm">
                  {user ? user.name : "Account"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden border border-purple-700/30 shadow-lg backdrop-blur-lg"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(88,28,135,0.95) 0%, rgba(59,7,100,0.95) 100%)",
                  }}
                >
                  <div className="px-4 py-3 border-b border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-400/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-200" />
                      </div>
                      <div>
                        {user ? (
                          <>
                            <div className="font-semibold text-sm text-white">
                              {user.name}
                            </div>
                            <div className="text-xs text-purple-200">
                              {user.email}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-sm text-white">
                              Welcome
                            </div>
                            <div className="text-xs text-purple-300">
                              Sign in to access your account
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 flex flex-col gap-2">
                    {user ? (
                      <button
                        onClick={onLogout}
                        className="rounded-md py-2 font-semibold text-sm text-white bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-700 hover:to-rose-700 transition"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
         
                          <Link
                          href="/login"
                          onClick={() => setProfileOpen(false)}
                          className="rounded-md py-2 text-sm text-center font-semibold text-purple-200 border border-purple-500/40 hover:bg-purple-900/40 transition"
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setProfileOpen(false)}
                          className="rounded-md py-2 text-sm text-center font-semibold text-purple-200 border border-purple-500/40 hover:bg-purple-900/40 transition"
                        >
                          SignUp
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CART BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-purple-900/40"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5 text-purple-300" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-600"
                  variant="destructive"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* MOBILE MENU */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-purple-950 to-black text-white">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium hover:text-purple-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
