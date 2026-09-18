import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Leaf, Menu, ShieldCheck, Sparkles, Wrench, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import roomImage from "@/assets/co-repairs-hero.png.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Co-Repairs | Authorized Service Centers, Under One Roof" },
      { name: "description", content: "A shared authorized service hub ecosystem making appliance and electronics repairs reliable, visible, and accessible." },
      { property: "og:title", content: "Co-Repairs | A New Standard in Service" },
      { property: "og:description", content: "Multiple authorized service centers, one professionally managed ecosystem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const story = [
  { eyebrow: null, title: "Authorized Service Centers, Under One Roof." },
  { eyebrow: "Our Goal", title: "A single, well-designed hub for every trusted brand." },
  { eyebrow: "Our Mission", title: "Consistent, standardized, trustworthy service." },
  { eyebrow: "Our Vision", title: "One flagship room. A PAN-India network next." },
];

const storyDescriptions = [
  "Co-Repairs. is a shared authorized service hub ecosystem designed to improve post-sales service for appliance and electronics brands. We bring multiple authorized service centers together under one roof to make repairs faster, more reliable, and more accessible.",
  "Reducing friction for customers and cost for brands, with accessible, reliable, and transparent repairs under one shared roof.",
  "Modern infrastructure and trained manpower, so every brand's service experience meets the same high bar.",
  "Expanding city by city, making repair the first choice, not the last resort.",
];

const ecosystem = [
  { icon: Wrench, title: "Shared infrastructure", text: "Modern tools, genuine parts, and trained technicians across multiple brands." },
  { icon: ShieldCheck, title: "Quality assurance", text: "Clear standards and transparent processes for a consistently reliable experience." },
  { icon: Sparkles, title: "Better for everyone", text: "Less overhead for brands and easier access to trusted repairs for customers." },
  { icon: Leaf, title: "Repair-first future", text: "Longer product life, less electronic waste, and more responsible consumption." },
];

function Index() {
  const [stage, setStage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const updateStage = () => {
      const storyElement = document.getElementById("story");
      if (!storyElement) return;
      const scrollable = storyElement.offsetHeight - window.innerHeight;
      const progress = Math.min(0.999, Math.max(0, -storyElement.getBoundingClientRect().top / scrollable));
      setStage(Math.min(story.length - 1, Math.floor(progress * story.length)));
    };
    updateStage();
    window.addEventListener("scroll", updateStage, { passive: true });
    return () => window.removeEventListener("scroll", updateStage);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <header className="site-header">
        <a href="#story" className="brand" aria-label="Co-Repairs home">
          <span className="brand-mark">CR</span><span>Co-Repairs.</span>
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <a href="#ecosystem" onClick={() => setMenuOpen(false)}>Ecosystem</a>
          <a href="#benefits" onClick={() => setMenuOpen(false)}>Benefits</a>
          <a href="#sustainability" onClick={() => setMenuOpen(false)}>Sustainability</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Partner with us</a>
        </nav>
        <div className="header-actions">
          <Button asChild className="header-cta"><a href="#book">Book a service</a></Button>
          <Button variant="ghost" size="icon" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <section id="story" className="story">
        <div className="story-sticky">
          <img src={roomImage.url} alt="Co-Repairs service center with four uniformed team members" className="room-image" width={1536} height={919} />

          <div className="story-copy">
            <div className="headline-slot">
              {story.map((item, index) => (
                <article key={index} className={index === stage ? "story-beat is-active" : "story-beat"} aria-hidden={index !== stage}>
                  {item.eyebrow && <p>{item.eyebrow}</p>}
                  <h1>{item.title}</h1>
                </article>
              ))}
            </div>

            <div className="desc-panel" aria-live="polite"><span>{storyDescriptions[stage]}</span></div>

            {stage === 0 && (
              <div className="story-actions">
                <Button asChild size="lg"><a href="#book">Book a Service <ArrowRight /></a></Button>
                <Button asChild size="lg" variant="outline"><a href="#ecosystem">Partner Ecosystem</a></Button>
              </div>
            )}
          </div>

          <div className="story-progress" aria-hidden="true">{story.map((_, index) => <span key={index} className={index === stage ? "is-active" : ""} />)}</div>
          <a href="#ecosystem" className="scroll-cue"><span>Scroll to enter</span><ArrowDown /></a>
        </div>
      </section>

      <section id="ecosystem" className="section intro-section">
        <div className="section-kicker">The Co-Repairs ecosystem</div>
        <div className="intro-grid">
          <h2>A new standard<br />in service.</h2>
          <p>Customers should not have to choose between convenience and trust. Co-Repairs brings authorized service teams together in thoughtfully designed hubs—making every visit clearer, faster, and more dependable.</p>
        </div>
      </section>

      <section id="benefits" className="section feature-section">
        <div className="feature-grid">
          {ecosystem.map(({ icon: Icon, title, text }, index) => (
            <article className="feature-item" key={title}>
              <div className="feature-number">0{index + 1}</div><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sustainability" className="sustainability-band">
        <div className="section sustainability-inner">
          <p className="section-kicker">Sustainability at our core</p>
          <h2>Repair more.<br />Replace less.</h2>
          <p className="sustainability-copy">Every repair extends a product’s useful life. Our shared model helps make repair the convenient first choice—not the last resort.</p>
          <div className="impact-row"><div><strong>One roof</strong><span>Multiple authorized brands</span></div><div><strong>PAN-India</strong><span>Our long-term vision</span></div><div><strong>Repair first</strong><span>A circular service model</span></div></div>
        </div>
      </section>

      <section id="book" className="section book-section">
        <div className="book-copy"><p className="section-kicker">Book a service</p><h2>Tell us what needs attention.</h2><p>Share a few details and the right service team can take it from there.</p></div>
        <form className="service-form" onSubmit={submit}>
          <label>Full name<input required name="name" placeholder="Your name" /></label>
          <label>Phone number<input required name="phone" inputMode="tel" placeholder="+91 98765 43210" /></label>
          <label>City<input required name="city" placeholder="Your city" /></label>
          <label>Brand<input required name="brand" placeholder="Samsung, LG, etc." /></label>
          <label className="form-wide">What needs repair?<textarea required name="issue" placeholder="Describe the appliance and the issue" rows={4} /></label>
          <div className="form-wide form-submit">{sent ? <p className="success-message"><Check /> Request noted. We’ll be in touch.</p> : <Button type="submit" size="lg">Request service <ArrowRight /></Button>}</div>
        </form>
      </section>

      <footer id="contact">
        <div><a href="#story" className="brand"><span className="brand-mark">CR</span><span>Co-Repairs.</span></a><p>Building a better post-sales service ecosystem.</p></div>
        <div><p className="footer-label">Contact</p><a href="mailto:support@co-repairs.com">support@co-repairs.com</a><span>India</span></div>
        <div><p className="footer-label">For brands</p><a href="mailto:partners@co-repairs.com">Start a partnership conversation <ArrowRight /></a></div>
      </footer>
    </main>
  );
}
