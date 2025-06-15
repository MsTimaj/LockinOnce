
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Users, Sparkles } from "lucide-react";

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Mobile Header */}
      <header className="px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-accent" />
          <span className="text-xl font-playfair font-bold text-foreground">LockInOnce</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {currentTheme === "light" ? "🌙" : "☀️"}
        </Button>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="px-4 py-12 text-center">
        <div className="max-w-sm mx-auto animate-fade-in-up">
          <h1 className="text-3xl font-playfair font-bold text-foreground mb-4 leading-tight">
            Find Love Through
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"> Science</span>
          </h1>
          
          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
            No more swiping. No more games. Just deep compatibility based on attachment theory, 
            psychology, and proven relationship science.
          </p>

          <div className="quote-romantic text-center mb-8 text-base">
            "You're both calm in a world that rushes."
          </div>

          <div className="space-y-3 mb-12">
            <Button className="btn-gradient w-full text-base px-6 py-3">
              Start Your Journey
            </Button>
            <Button variant="ghost" className="btn-secondary w-full">
              Learn More
            </Button>
          </div>

          {/* Hero Image - Mobile Optimized */}
          <div className="relative">
            <div className="card-soft p-4 bg-gradient-to-r from-primary/20 to-secondary/20">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                alt="Couple connecting meaningfully" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Grid */}
      <section className="px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-3">
            How LockInOnce Works
          </h2>
          <p className="text-sm text-muted-foreground">
            Our science-based approach focuses on what really matters for lasting relationships
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
          <Card className="card-soft p-4 text-center group hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-4">
              <Brain className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-playfair font-semibold mb-2">Psychology First</h3>
              <p className="text-sm text-muted-foreground">
                Deep dive into attachment styles, personality types, and emotional compatibility
              </p>
            </CardContent>
          </Card>

          <Card className="card-soft p-4 text-center group hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-4">
              <Users className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-playfair font-semibold mb-2">10 Daily Matches</h3>
              <p className="text-sm text-muted-foreground">
                Quality over quantity. Carefully curated matches delivered each morning
              </p>
            </CardContent>
          </Card>

          <Card className="card-soft p-4 text-center group hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-4">
              <Sparkles className="h-10 w-10 text-secondary mx-auto mb-3" />
              <h3 className="text-lg font-playfair font-semibold mb-2">No Swiping</h3>
              <p className="text-sm text-muted-foreground">
                Thoughtful connections replace mindless scrolling. Every match matters
              </p>
            </CardContent>
          </Card>

          <Card className="card-soft p-4 text-center group hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-4">
              <Heart className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-playfair font-semibold mb-2">Real Relationships</h3>
              <p className="text-sm text-muted-foreground">
                Built for people seeking meaningful, lasting connections
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="px-4 py-12">
        <div className="card-soft p-6 text-center bg-gradient-to-r from-primary/10 to-secondary/10 max-w-sm mx-auto">
          <h2 className="text-xl font-playfair font-bold text-foreground mb-3">
            Ready to Find Your Match?
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Join thousands who've found love through science, not chance
          </p>
          <Button className="btn-gradient w-full text-base px-6 py-3">
            Begin Your Journey
          </Button>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="px-4 py-8 text-center text-muted-foreground">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Heart className="h-5 w-5 text-accent" />
          <span className="font-playfair font-semibold text-sm">LockInOnce</span>
        </div>
        <p className="text-xs">
          Science-based dating for meaningful connections © 2024
        </p>
      </footer>
    </div>
  );
};

export default Index;
