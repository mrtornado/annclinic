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
    <section className="relative min-h-[60vh] bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Particles */}
      <FloatingParticles
        count={25}
        colors={["#0d9488", "#14b8a6", "#06b6d4"]}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-12">
          {/* Main Heading */}
          <AnimatedText
            className="text-4xl md:text-5xl lg:text-6xl font-bold text mb-6"
            delay={0.1}
          >
            Articole Medicale și Ghiduri de Sănătate
          </AnimatedText>

          {/* Subtitle */}
          <AnimatedText
            className="text-xl md:text-2xl text-secondary mb-8 max-w-3xl mx-auto"
            delay={0.3}
          >
            Informații credibile și actualizate de la specialiștii ANN Clinic
          </AnimatedText>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">
                {totalArticles}
              </div>
              <div className="text-sm text-secondary dark:text-muted">
                Articole Publicate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                {specialties.length}
              </div>
              <div className="text-sm text-secondary dark:text-muted">
                Specialități Medicale
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                100%
              </div>
              <div className="text-sm text-secondary dark:text-muted">
                Revizuite Medical
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              href="#articole"
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              📚 Explorează Articolele
            </AnimatedButton>
            <AnimatedButton
              href="/programare"
              variant="outline"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              🏥 Programează Consultație
            </AnimatedButton>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text dark:text-white text-center mb-8">
              Articole Recomandate
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <div
                  key={article.slug}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
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
              ))}
            </div>
          </div>
        )}
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
