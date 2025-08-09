import React from "react";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import FloatingParticles from "../magic-ui/FloatingParticles";

interface FeaturedArticle {
  slug: string;
  data: {
    title: string;
    description: string;
    specialty: string;
    publishDate: Date;
    readingTime?: number;
    image?: string;
    imageAlt?: string;
    featured: boolean;
  };
}

interface ArticlesHeroProps {
  totalArticles: number;
  specialties: string[];
  featuredArticles: FeaturedArticle[];
}

export default function ArticlesHero({
  totalArticles,
  specialties,
  featuredArticles,
}: ArticlesHeroProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <section className="relative min-h-[85vh] pt-16 sm:pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-hover/85 to-primary-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />

      {/* Background Particles */}
      <FloatingParticles
        count={30}
        colors={["#ffffff", "#b2dfdb", "#c8e6c9"]}
      />

      {/* Modern Geometric Elements */}
      <div className="absolute inset-0">
        {/* Subtle shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-32 right-20 w-24 h-24 bg-white/8 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/6 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="text-center mb-12">
          {/* Main Heading */}
          <AnimatedText
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            delay={0.1}
          >
            <span className="block mb-2">Articole Medicale</span>
            <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent hero-gradient-flow">
              Ghiduri de Sănătate
            </span>
          </AnimatedText>

          {/* Subtitle */}
          <AnimatedText
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            delay={0.3}
          >
            Informații credibile și actualizate de la specialiștii ANN Clinic
          </AnimatedText>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {totalArticles}
              </div>
              <div className="text-sm text-white/80">Articole Publicate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {specialties.length}
              </div>
              <div className="text-sm text-white/80">Specialități Medicale</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                100%
              </div>
              <div className="text-sm text-white/80">Revizuite Medical</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <AnimatedButton
              href="#articole"
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-xl font-semibold shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              <span className="text-xl">📚</span>
              <span>Explorează Articolele</span>
            </AnimatedButton>
            <AnimatedButton
              href="/programare"
              variant="outline"
              size="lg"
              className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/50 hover:border-white/70 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              <span className="text-xl">🏥</span>
              <span>Programează Consultație</span>
            </AnimatedButton>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mt-16">
            <AnimatedText delay={0.6} className="text-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-xl border border-white/20">
                <span className="text-xl">⭐</span>
                <span>Articole Recomandate</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white rounded-full hero-pulse"></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full hero-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full hero-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </AnimatedText>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <AnimatedText
                  key={article.slug}
                  delay={0.8 + index * 0.1}
                  className="h-full"
                >
                  <div className="group h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-primary/20 transform hover:scale-[1.03] backdrop-blur-lg">
                    {article.data.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.data.image}
                          alt={article.data.imageAlt || article.data.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-full shadow-lg">
                            {article.data.specialty}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        <a href={`/articole/${article.slug}`}>
                          {article.data.title}
                        </a>
                      </h3>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                        {article.data.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{formatDate(article.data.publishDate)}</span>
                        {article.data.readingTime && (
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {article.data.readingTime} min
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        )}

        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center hover:border-white/80 transition-colors duration-300 bg-white/10 backdrop-blur-sm">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse" />
            </div>
            <p className="text-white/80 text-sm mt-3 font-semibold">Scroll</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// CSS for animations
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
