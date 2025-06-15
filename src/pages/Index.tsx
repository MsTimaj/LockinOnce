
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
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-accent" />
          <span className="text-2xl font-playfair font-bold text-foreground">LockInOnce</span>
        </div>
        <Button 
          variant="ghost" 
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {currentTheme === "light" ? "🌙 Twilight" : "☀️ Daylight"}
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-foreground mb-6 leading-tight">
            Find Love Through
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"> Science</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            No more swiping. No more games. Just deep compatibility based on attachment theory, 
            psychology, and proven relationship science.
          </p>

          <div className="quote-romantic text-center mb-12">
            "You're both calm in a world that rushes."
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button className="btn-gradient text-lg px-8 py-4">
              Start Your Journey
            </Button>
            <Button variant="ghost" className="btn-secondary">
              Learn More
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-2xl mx-auto">
            <div className="card-soft p-8 bg-gradient-to-r from-primary/20 to-secondary/20">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                alt="Couple connecting meaningfully" 
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
            How LockInOnce Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our science-based approach focuses on what really matters for lasting relationships
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="card-soft p-6 text-center group hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-6">
              <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold mb-3">Psychology First</h3>
              <p className="text-muted-foreground">
                Deep dive into attachment styles, personality types, and emotional compatibility
              </p>
            </CardContent>
          </Card>

          <Card className="card-soft p-6 text-center group hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold mb-3">10 Daily Matches</h3>
              <p className="text-muted-foreground">
                Quality over quantity. Carefully curated matches delivered each morning
              </p>
            </CardContent>
          </Card>

          <Card className="card-soft p-6 text-center group hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-6">
              <Sparkles className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold mb-3">No Swiping</h3>
              <p className="text-muted-foreground">
                Thoughtful connections replace mindless scrolling. Every match matters
              </p>
            </CardContent>
          </Card>

          <Card className="card-soft p-6 text-center group hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-6">
              <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold mb-3">Real Relationships</h3>
              <p className="text-muted-foreground">
                Built for people seeking meaningful, lasting connections
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="card-soft p-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
            Ready to Find Your Match?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands who've found love through science, not chance
          </p>
          <Button className="btn-gradient text-lg px-8 py-4">
            Begin Your Compatibility Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-muted-foreground">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="h-6 w-6 text-accent" />
          <span className="font-playfair font-semibold">LockInOnce</span>
        </div>
        <p className="text-sm">
          Science-based dating for meaningful connections © 2024
        </p>
      </footer>
    </div>
  );
};

export default Index;
