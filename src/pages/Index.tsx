
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Users, Sparkles, Moon, Sun } from "lucide-react";

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Modern Mobile Header */}
      <header className="px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-2xl bg-gradient-to-r from-primary to-accent animate-pulse-glow">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LockInOnce
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleTheme}
          className="p-3 rounded-xl hover:bg-primary/10 transition-colors"
        >
          {currentTheme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </header>

      {/* Hero Section - Modern Mobile */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-sm mx-auto animate-float-up">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-6 leading-tight">
            Find Love Through
            <span className="block text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text animate-shimmer">
              Science
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            No more swiping. No more games. Just deep compatibility based on attachment theory, 
            psychology, and proven relationship science.
          </p>

          <div className="quote-modern mb-12 py-6 px-4 card-glass">
            "You're both calm in a world that rushes."
          </div>

          <div className="space-y-4 mb-16">
            <Button className="btn-gradient w-full text-lg font-semibold">
              Start Your Journey
            </Button>
            <Button className="btn-secondary w-full text-lg">
              Learn More
            </Button>
          </div>

          {/* Modern Hero Image */}
          <div className="relative">
            <div className="card-glass p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                alt="Couple connecting meaningfully" 
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section className="px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
            How LockInOnce Works
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Our science-based approach focuses on what really matters
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
          <Card className="card-glass p-6 text-center group">
            <CardContent className="pt-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 w-fit mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3 text-foreground">Psychology First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deep dive into attachment styles, personality types, and emotional compatibility
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass p-6 text-center group">
            <CardContent className="pt-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3 text-foreground">10 Daily Matches</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quality over quantity. Carefully curated matches delivered each morning
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass p-6 text-center group">
            <CardContent className="pt-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-secondary/20 to-accent/20 w-fit mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3 text-foreground">No Swiping</h3>
              <p className="text-muted-foreground leading-relaxed">
                Thoughtful connections replace mindless scrolling. Every match matters
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass p-6 text-center group">
            <CardContent className="pt-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 w-fit mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3 text-foreground">Real Relationships</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built for people seeking meaningful, lasting connections
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section - Modern */}
      <section className="px-6 py-16">
        <div className="card-glass p-8 text-center bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 max-w-sm mx-auto">
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
            Ready to Find Your Match?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 font-medium">
            Join thousands who've found love through science, not chance
          </p>
          <Button className="btn-gradient w-full text-lg font-semibold">
            Begin Your Journey
          </Button>
        </div>
      </section>

      {/* Footer - Modern */}
      <footer className="px-6 py-12 text-center text-muted-foreground">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <span className="font-playfair font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LockInOnce
          </span>
        </div>
        <p className="text-sm font-medium">
          Science-based dating for meaningful connections © 2024
        </p>
      </footer>
    </div>
  );
};

export default Index;
