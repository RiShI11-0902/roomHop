import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Shield, Search } from "lucide-react";
import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#363062] to-[#4D4C7D]">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center px-4">
          <div className="container mx-auto  items-center justify-between">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-[#F5F5F5]  mb-6">
                Find Your Perfect{" "}
                <span className="text-[#F99417]">Roommate</span> Match
              </h1>
              <p className="text-xl text-[#F5F5F5] mb-8">
                Smart matching algorithms, verified profiles, and a community of
                like-minded people ready to share their space with you.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#F99417] hover:bg-[#F5F5F5] text-[#363062] px-8"
                >
                  Find Roommates
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-[#363062] bg-[#F99417] border-[#F99417] hover:bg-[#F5F5F5] "
                >
                  List Your Space
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 ">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-[#F5F5F5] mb-16">
              Why Choose RoomMatch?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-[#F5F5F5] border-none p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-[#363062] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#363062]">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#F99417]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-[#363062] mb-6">
              Ready to Find Your Perfect Roommate?
            </h2>
            <p className="text-xl text-[#4D4C7D] mb-8 max-w-2xl mx-auto">
              Join thousands of happy roommates who found their perfect match
              through RoomMatch.
            </p>
            <Button
              size="lg"
              className="bg-[#363062] text-[#F5F5F5] hover:bg-[#4D4C7D] px-8"
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

const features = [
  {
    icon: <Search className="w-12 h-12 text-[#F99417]" />,
    title: "Smart Matching",
    description:
      "Our AI-powered algorithm finds compatible roommates based on lifestyle, preferences, and habits.",
  },
  {
    icon: <Shield className="w-12 h-12 text-[#F99417]" />,
    title: "Verified Profiles",
    description:
      "Every profile is verified to ensure a safe and trustworthy roommate finding experience.",
  },
  {
    icon: <Users className="w-12 h-12 text-[#F99417]" />,
    title: "Active Community",
    description:
      "Join a vibrant community of people looking for their perfect living situation.",
  },
];
