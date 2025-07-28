import { useState, useEffect } from "react";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import FloatingParticles from "../magic-ui/FloatingParticles";
import type { ArticleContent } from "../../types/content";

interface ArticlesSectionProps {
  articles: ArticleContent[];
}

const specialtyIcons: Record<string, string> = {
  cardiologie: "❤️",
  dermatologie: "🧴",
  ginecologie: "🌸",
  pediatrie: "👶",
  ortopedie: "🦴",
  orl: "👂",
  estetica: "✨",
  neurologie: "🧠",
  endocrinologie: "⚖️",
  gastroenterologie: "🫄",
  urologie: "💧",
  oftalmologie: "👁️",
  psihiatrie: "🧘",
  radiologie: "📡",
  laborator: "🔬",
  default: "📰",
};

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [featuredArticles, setFeaturedArticles] = useState<ArticleContent[]>(
    []
  );

  useEffect(() => {
    setFeaturedArticles(articles.filter((article) => article.data.featured));
  }, [articles]);

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-surface via-surface-secondary to-surface overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <FloatingParticles count={25} />
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/8 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-primary/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/8 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
        {/* Enhanced gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <AnimatedText delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/20 hover:bg-surface-elevated transition-all duration-300">
              <AnimatedIcon icon="📚" size="sm" />
              <span>Educație Medicală</span>
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            </div>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text mb-6">
              <span className="block">Articole</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
                Medicale
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Informații utile despre sănătate de la{" "}
              <span className="font-semibold text-primary">
                specialiștii noștri
              </span>{" "}
              cu experiență în diverse domenii medicale
            </p>
          </AnimatedText>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuredArticles.map((article, index) => (
            <AnimatedText key={article.slug} delay={0.8 + index * 0.1}>
              <article className="group relative bg-surface-elevated/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border/20 hover:border-primary/30 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Article Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                          <span className="text-2xl">
                            {specialtyIcons[
                              article.data.specialty?.toLowerCase() || ""
                            ] || specialtyIcons.default}
                          </span>
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                      </div>
                      <div>
                        <span className="inline-block bg-gradient-to-r from-primary/15 to-secondary/15 text-primary px-4 py-2 rounded-full text-xs font-semibold border border-primary/20 group-hover:border-primary/40 transition-all duration-300 hover:scale-105">
                          {article.data.specialty}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-tertiary text-sm bg-surface/50 px-3 py-1 rounded-full">
                      <span className="text-lg">⏱️</span>
                      <span className="font-medium">
                        {article.data.readingTime || 5} min
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {article.data.title}
                    </h3>
                    <p className="text-secondary text-lg leading-relaxed line-clamp-3">
                      {article.data.description}
                    </p>
                  </div>

                  {/* Article Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-lg">👨‍⚕️</span>
                      </div>
                      <div>
                        <div className="text-secondary font-semibold">
                          {article.data.author}
                        </div>
                        <div className="text-xs text-muted">
                          Specialist Medical
                        </div>
                      </div>
                    </div>
                    <AnimatedButton
                      href={`/articole/${article.slug}`}
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        <span>Citește</span>
                        <span className="text-lg">→</span>
                      </span>
                    </AnimatedButton>
                  </div>
                </div>
              </article>
            </AnimatedText>
          ))}
        </div>

        {/* View All Button */}
        <AnimatedText delay={1.2}>
          <div className="text-center mt-12">
            <AnimatedButton
              href="/articole"
              variant="primary"
              size="lg"
              className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <AnimatedIcon icon="📚" size="sm" />
                <span>Vezi Toate Articolele</span>
                <AnimatedIcon icon="✨" size="sm" />
              </span>
            </AnimatedButton>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
